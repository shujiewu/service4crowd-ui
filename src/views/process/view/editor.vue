<template>
  <div id="bpmnModel" v-bind:style="{ marginTop: offsetY,width: INITIAL_CANVAS_WIDTH, height: INITIAL_CANVAS_HEIGHT}">

  </div>
</template>

<script>
  import Raphael from 'raphael'
  import { viewProcess } from '@/api/process/view'

  export default {
    name: 'editor',
    data() {
      return {
        china: [],
        processModelId: '',
        INITIAL_CANVAS_WIDTH: 0,
        INITIAL_CANVAS_HEIGHT: 0,
        canvasWidth: 0,
        canvasHeight: 0,
        viewBoxWidth: 0,
        viewBoxHeight: 0,
        modelType: 'design',
        offsetY: 0,
        MAIN_STROKE_COLOR: '#585858',
        CURRENT_COLOR: '#017501',
        COMPLETED_COLOR: '#2632aa',
        SEQUENCEFLOW_STROKE: 1.5,
        ANCHOR_TYPE: {
          main: 'main',
          middle: 'middle',
          first: 'first',
          last: 'last'
        },
        anchors: [],
        points: [],
        strokeWidth: 1,
        closePath: false,
        radius: 1,
        ARROW_WIDTH: 4
      }
    },
    created() {
      this.processModelId = this.$route.params.id
      this.getModel()
    },
    mounted() {
    },
    methods: {
      _bpmnGetColor(element, defaultColor) {
        var strokeColor
        if (element.current) {
          strokeColor = this.CURRENT_COLOR
        } else if (element.completed) {
          strokeColor = this.COMPLETED_COLOR
        } else {
          strokeColor = defaultColor
        }
        return strokeColor
      },
      _drawStartEvent(element) {
        var NORMAL_STROKE = 1
        this._drawEvent(element, NORMAL_STROKE, 15)
      },
      _drawEndEvent(element) {
        var ENDEVENT_STROKE = 3
        var endEvent = this._drawEvent(element, ENDEVENT_STROKE, 14)
        endEvent.click(function() {
          console.log('end')
        })
      },
      _determineCustomFillColor(element, defaultColor) {
        var color
        // By name
        // if (customActivityColors && customActivityColors[element.name]) {
        //   color = customActivityColors[element.name]
        // }
        // if (color !== null && color !== undefined) {
        //   return color
        // }
        // // By id
        // if (customActivityColors && customActivityColors[element.id]) {
        //   color = customActivityColors[element.id]
        // }
        if (color !== null && color !== undefined) {
          return color
        }
        return defaultColor
      },
      _drawEvent(element, strokeWidth, radius) {
        var x = element.x + (element.width / 2)
        var y = element.y + (element.height / 2)

        var circle = this.paper.circle(x, y, radius)

        var strokeColor = this._bpmnGetColor(element, this.MAIN_STROKE_COLOR)

        // Fill
        var eventFillColor = this._determineCustomFillColor(element, '#ffffff')

        // Opacity
        var eventOpacity = 1.0
        // if (customActivityBackgroundOpacity) {
        //   eventOpacity = customActivityBackgroundOpacity
        // }

        circle.attr({
          'stroke-width': strokeWidth,
          'stroke': strokeColor,
          'fill': eventFillColor,
          'fill-opacity': eventOpacity
        })

        circle.id = element.id

        // _drawEventIcon(paper, element)
        return circle
      },
      _drawServiceTaskIcon(paper, startX, startY) {
        var path1 = paper.path('M 8,1 7.5,2.875 c 0,0 -0.02438,0.250763 -0.40625,0.4375 C 7.05724,3.330353 7.04387,3.358818 7,3.375 6.6676654,3.4929791 6.3336971,3.6092802 6.03125,3.78125 6.02349,3.78566 6.007733,3.77681 6,3.78125 5.8811373,3.761018 5.8125,3.71875 5.8125,3.71875 l -1.6875,-1 -1.40625,1.4375 0.96875,1.65625 c 0,0 0.065705,0.068637 0.09375,0.1875 0.002,0.00849 -0.00169,0.022138 0,0.03125 C 3.6092802,6.3336971 3.4929791,6.6676654 3.375,7 3.3629836,7.0338489 3.3239228,7.0596246 3.3125,7.09375 3.125763,7.4756184 2.875,7.5 2.875,7.5 L 1,8 l 0,2 1.875,0.5 c 0,0 0.250763,0.02438 0.4375,0.40625 0.017853,0.03651 0.046318,0.04988 0.0625,0.09375 0.1129372,0.318132 0.2124732,0.646641 0.375,0.9375 -0.00302,0.215512 -0.09375,0.34375 -0.09375,0.34375 L 2.6875,13.9375 4.09375,15.34375 5.78125,14.375 c 0,0 0.1229911,-0.09744 0.34375,-0.09375 0.2720511,0.147787 0.5795915,0.23888 0.875,0.34375 0.033849,0.01202 0.059625,0.05108 0.09375,0.0625 C 7.4756199,14.874237 7.5,15.125 7.5,15.125 L 8,17 l 2,0 0.5,-1.875 c 0,0 0.02438,-0.250763 0.40625,-0.4375 0.03651,-0.01785 0.04988,-0.04632 0.09375,-0.0625 0.332335,-0.117979 0.666303,-0.23428 0.96875,-0.40625 0.177303,0.0173 0.28125,0.09375 0.28125,0.09375 l 1.65625,0.96875 1.40625,-1.40625 -0.96875,-1.65625 c 0,0 -0.07645,-0.103947 -0.09375,-0.28125 0.162527,-0.290859 0.262063,-0.619368 0.375,-0.9375 0.01618,-0.04387 0.04465,-0.05724 0.0625,-0.09375 C 14.874237,10.52438 15.125,10.5 15.125,10.5 L 17,10 17,8 15.125,7.5 c 0,0 -0.250763,-0.024382 -0.4375,-0.40625 C 14.669647,7.0572406 14.641181,7.0438697 14.625,7 14.55912,6.8144282 14.520616,6.6141566 14.4375,6.4375 c -0.224363,-0.4866 0,-0.71875 0,-0.71875 L 15.40625,4.0625 14,2.625 l -1.65625,1 c 0,0 -0.253337,0.1695664 -0.71875,-0.03125 l -0.03125,0 C 11.405359,3.5035185 11.198648,3.4455201 11,3.375 10.95613,3.3588185 10.942759,3.3303534 10.90625,3.3125 10.524382,3.125763 10.5,2.875 10.5,2.875 L 10,1 8,1 z m 1,5 c 1.656854,0 3,1.3431458 3,3 0,1.656854 -1.343146,3 -3,3 C 7.3431458,12 6,10.656854 6,9 6,7.3431458 7.3431458,6 9,6 z')
        path1.attr({
          'opacity': 1,
          'stroke': 'none',
          'fill': '#72a7d0'
        })

        var serviceTaskIcon = paper.set()
        serviceTaskIcon.push(path1)
        serviceTaskIcon.transform('T' + startX + ',' + startY)
      },
      _drawServiceTask(element) {
        this._drawTask(element)
        this._drawServiceTaskIcon(this.paper, element.x + 4, element.y + 4)
      },

      _drawTask(element) {
        var ACTIVITY_STROKE_COLOR = '#bbbbbb'
        var TASK_STROKE = 1
        var TASK_HIGHLIGHT_STROKE = 2
        var ACTIVITY_FILL_COLOR = '#f9f9f9'

        var rectAttrs = {}
        // Stroke
        var strokeColor = this._bpmnGetColor(element, ACTIVITY_STROKE_COLOR)
        rectAttrs['stroke'] = strokeColor

        var strokeWidth
        if (strokeColor === ACTIVITY_STROKE_COLOR) {
          strokeWidth = TASK_STROKE
        } else {
          strokeWidth = TASK_HIGHLIGHT_STROKE
        }

        var width = element.width - (strokeWidth / 2)
        var height = element.height - (strokeWidth / 2)

        var rect = this.paper.rect(element.x, element.y, width, height, 4)
        rectAttrs['stroke-width'] = strokeWidth

        // Fill
        var fillColor = this._determineCustomFillColor(element, ACTIVITY_FILL_COLOR)
        rectAttrs['fill'] = fillColor

        // Opacity
        // if (customActivityBackgroundOpacity) {
        //   rectAttrs['fill-opacity'] = customActivityBackgroundOpacity
        // }

        rect.attr(rectAttrs)
        rect.id = element.id

        if (element.name) {
          this._drawMultilineText(element.name, element.x, element.y, element.width, element.height, 'middle', 'middle', 11)
        }
      },

      _drawMultilineText(text, x, y, boxWidth, boxHeight, horizontalAnchor, verticalAnchor, fontSize) {
        var TEXT_PADDING = 3

        if (!text || text === '') {
          return
        }

        var textBoxX, textBoxY
        var width = boxWidth - (2 * TEXT_PADDING)

        if (horizontalAnchor === 'middle') {
          textBoxX = x + (boxWidth / 2)
        } else if (horizontalAnchor === 'start') {
          textBoxX = x
        }

        textBoxY = y + (boxHeight / 2)

        var t = this.paper.text(textBoxX + TEXT_PADDING, textBoxY + TEXT_PADDING).attr({
          'text-anchor': horizontalAnchor,
          'font-family': 'Arial',
          'font-size': fontSize,
          'fill': '#373e48'
        })

        var abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        t.attr({
          'text': abc
        })
        var letterWidth = t.getBBox().width / abc.length

        t.attr({
          'text': text
        })
        var removedLineBreaks = text.split('\n')
        var s = []
        x = 0
        for (var r = 0; r < removedLineBreaks.length; r++) {
          var words = removedLineBreaks[r].split(' ')
          for (var i = 0; i < words.length; i++) {
            var l = words[i].length
            if (x + (l * letterWidth) > width) {
              s.push('\n')
              x = 0
            }
            x += l * letterWidth
            s.push(words[i] + ' ')
          }
          s.push('\n')
          x = 0
        }
        t.attr({
          'text': s.join('')
        })

        if (verticalAnchor && verticalAnchor === 'top') {
          t.attr({ 'y': y + (t.getBBox().height / 2) })
        }
      },
      _Polyline(uuid, points, strokeWidth, paper) {
        this.points = points
        this.strokeWidth = strokeWidth
        this.closePath = false
        this.anchors = []
        var linesCount = this.points.length - 1
        if (linesCount < 1) {
          return
        }
        for (var i = 0; i < this.points.length; i++) {
          this.points[i].x = parseFloat(this.points[i].x)
          this.points[i].y = parseFloat(this.points[i].y)
        }
        this.pushAnchor(this.ANCHOR_TYPE.first, this.getLine(0).x1, this.getLine(0).y1)
        for (var ii = 1; ii < linesCount; ii++) {
          var line1 = this.getLine(ii - 1)
          this.pushAnchor(this.ANCHOR_TYPE.main, line1.x2, line1.y2)
        }
        this.pushAnchor(this.ANCHOR_TYPE.last, this.getLine(linesCount - 1).x2, this.getLine(linesCount - 1).y2)
        return this.rebuildPath()
      },
      getAnchorsCount(type) {
        if (!type) { return this.anchors.length } else {
          var count = 0
          for (var i = 0; i < this.getAnchorsCount(); i++) {
            var anchor = this.anchors[i]
            if (anchor.getType() === type) {
              count++
            }
          }
          return count
        }
      },
      pushAnchor(type, x, y, index) {
        if (type === this.ANCHOR_TYPE.first) {
          index = 0
          // typeIndex = 0
        } else if (type === this.ANCHOR_TYPE.last) {
          index = this.getAnchorsCount()
          // typeIndex = 0
        } else if (!index) {
          index = this.anchors.length
        } else {
          for (var i = 0; i < this.getAnchorsCount(); i++) {
            var anchor = this.anchors[i]
            if (anchor.index > index) {
              anchor.index++
              // anchor.typeIndex++
            }
          }
        }
        var newAnchor = {
          x: x,
          y: y,
          type: this.ANCHOR_TYPE.main,
          // isFirst: false,
          // isLast: false,
          index: index
          // typeIndex: 0
        }
        // new Anchor(this.id, ANCHOR_TYPE.main, x, y, index, typeIndex)
        this.anchors.push(newAnchor)
      },
      _getLine(i) {
        if (this.points.length > i && this.points[i]) {
          return { x1: this.points[i].x, y1: this.points[i].y, x2: this.points[i + 1].x, y2: this.points[i + 1].y }
        } else {
          return undefined
        }
      },
      getLine(i) {
        var line = this._getLine(i)
        if (line !== undefined) {
          line.angle = this.getLineAngle(i)
        }
        return line
      },
      getLineAngle: function(i) {
        var line = this._getLine(i)
        return Math.atan2(line.y2 - line.y1, line.x2 - line.x1)
      },
      getLineLengthX: function(i) {
        var line = this.getLine(i)
        return (line.x2 - line.x1)
      },
      getLineLengthY: function(i) {
        var line = this.getLine(i)
        return (line.y2 - line.y1)
      },
      getLineLength: function(i) {
        return Math.sqrt(Math.pow(this.getLineLengthX(i), 2) + Math.pow(this.getLineLengthY(i), 2))
      },
      rebuildPath() {
        var path = []

        for (var i = 0; i < this.anchors.length; i++) {
          var anchor = this.anchors[i]

          var pathType = ''
          if (i === 0) { pathType = 'M' } else { pathType = 'L' }

          // TODO: save previous points and calculate new path just if points are updated, and then save currents values as previous
          var targetX = anchor.x
          var targetY = anchor.y
          if (i > 0 && i < this.anchors.length - 1) {
            // get new x,y
            var cx = anchor.x
            var cy = anchor.y

            // pivot point of prev line
            var AO = this.getLineLength(i - 1)
            if (AO < 1) {
              AO = 1
            }

            // this.isDefaultConditionAvailable = (this.isDefaultConditionAvailable || (i == 1 && AO > 10))

            var ED = this.getLineLengthY(i - 1) * this.radius / AO
            var OD = this.getLineLengthX(i - 1) * this.radius / AO
            targetX = anchor.x - OD
            targetY = anchor.y - ED

            if (AO < 2 * this.radius && i > 1) {
              targetX = anchor.x - this.getLineLengthX(i - 1) / 2
              targetY = anchor.y - this.getLineLengthY(i - 1) / 2
            }

            // pivot point of next line
            AO = this.getLineLength(i)
            if (AO < this.radius) {
              AO = this.radius
            }
            ED = this.getLineLengthY(i) * this.radius / AO
            OD = this.getLineLengthX(i) * this.radius / AO
            var nextSrcX = anchor.x + OD
            var nextSrcY = anchor.y + ED

            if (AO < 2 * this.radius && i < this.getAnchorsCount() - 2) {
              nextSrcX = anchor.x + this.getLineLengthX(i) / 2
              nextSrcY = anchor.y + this.getLineLengthY(i) / 2
            }

            var dx0 = (cx - targetX) / 3
            var dy0 = (cy - targetY) / 3
            var ax = cx - dx0
            var ay = cy - dy0

            var dx1 = (cx - nextSrcX) / 3
            var dy1 = (cy - nextSrcY) / 3
            var bx = cx - dx1
            var by = cy - dy1

            var zx = nextSrcX
            var zy = nextSrcY
          } else if (i === 1 && this.getAnchorsCount() === 2) {
            AO = this.getLineLength(i - 1)
            if (AO < this.radius) {
              AO = this.radius
            }
            this.isDefaultConditionAvailable = (this.isDefaultConditionAvailable || (i === 1 && AO > 10))
          }

          // anti smoothing
          if (this.strokeWidth % 2 === 1) {
            targetX += 0.5
            targetY += 0.5
          }

          path.push([pathType, targetX, targetY])

          if (i > 0 && i < this.getAnchorsCount() - 1) {
            path.push(['C', ax, ay, bx, by, zx, zy])
          }
        }

        if (this.closePath) {
          path.push(['Z'])
        }

        return path
      },

      _drawFlow(flow) {
        var polyline = this._Polyline(flow.id, flow.waypoints, this.SEQUENCEFLOW_STROKE, this.paper)

        var strokeColor = this._bpmnGetColor(flow, this.MAIN_STROKE_COLOR)
        console.log(polyline)
        var element = this.paper.path(polyline)
        element.attr({ 'stroke-width': this.SEQUENCEFLOW_STROKE })
        element.attr({ 'stroke': strokeColor })

        element.id = flow.id

        var lastLineIndex = this.points.length - 2
        var line = this.getLine(lastLineIndex)
        //
        // if (line === undefined) return

        // if (flow.type === 'connection' && flow.conditions) {
        //   var middleX = (line.x1 + line.x2) / 2
        //   var middleY = (line.y1 + line.y2) / 2
        //   var image = this.paper.image('../editor/images/condition-flow.png', middleX - 8, middleY - 8, 16, 16)
        // }

        // var polylineInvisible = this.Polyline(flow.id, flow.waypoints, this.SEQUENCEFLOW_STROKE, this.paper)

        var polylineInvisibleelement = this.paper.path(polyline)
        polylineInvisibleelement.attr({
          'opacity': 0,
          'stroke-width': 8,
          'stroke': '#000000'
        })

        // _showTip(jQuery(polylineInvisible.element.node), flow)

        polylineInvisibleelement.mouseover(function() {
          this.paper.getById(element.id).attr({ 'stroke': 'blue' })
        })

        polylineInvisibleelement.mouseout(function() {
          this.paper.getById(element.id).attr({ 'stroke': '#585858' })
        })
        console.log(line)
        this._drawArrowHead(line)
      },

      _drawArrowHead(line, connectionType) {
        var doubleArrowWidth = 2 * this.ARROW_WIDTH

        var arrowHead = this.paper.path('M0 0L-' + (this.ARROW_WIDTH / 2 + 0.5) + ' -' + doubleArrowWidth + 'L' + (this.ARROW_WIDTH / 2 + 0.5) + ' -' + doubleArrowWidth + 'z')

        // anti smoothing
        if (this.strokeWidth % 2 === 1) {
          line.x2 += 0.5
          line.y2 += 0.5
        }

        arrowHead.transform('t' + line.x2 + ',' + line.y2 + '')
        arrowHead.transform('...r' + Raphael.deg(line.angle - Math.PI / 2) + ' ' + 0 + ' ' + 0)

        arrowHead.attr('fill', '#585858')

        arrowHead.attr('stroke-width', this.SEQUENCEFLOW_STROKE)
        arrowHead.attr('stroke', '#585858')

        return arrowHead
      },

      getModel() {
        viewProcess(this.processModelId)
          .then(data => {
            if ((!data.elements || data.elements.length === 0) && (!data.pools || data.pools.length === 0)) {
              return
            }
            this.INITIAL_CANVAS_WIDTH = data.diagramWidth + 50
            this.INITIAL_CANVAS_HEIGHT = data.diagramHeight + 50
            this.canvasWidth = this.INITIAL_CANVAS_WIDTH
            this.canvasHeight = this.INITIAL_CANVAS_HEIGHT
            this.viewBoxWidth = this.INITIAL_CANVAS_WIDTH
            this.viewBoxHeight = this.INITIAL_CANVAS_HEIGHT
            if (this.modelType === 'design') {
              var headerBarHeight = 170
              if (window.height > (this.canvasHeight + headerBarHeight)) {
                this.offsetY = (window.height - headerBarHeight - this.canvasHeight) / 2
              }
              if (this.offsetY > 50) {
                this.offsetY = 50
              }
            }
            this.paper = Raphael(document.getElementById('bpmnModel'), this.canvasWidth, this.canvasHeight)
            this.paper.setViewBox(0, 0, this.viewBoxWidth, this.viewBoxHeight, false)
            this.paper.renderfix()
            // if (data.pools) {
            //   for (var i = 0; i < data.pools.length; i++) {
            //     var pool = data.pools[i]
            //     _drawPool(pool)
            //   }
            // }
            var modelElements = data.elements
            for (var i = 0; i < modelElements.length; i++) {
              var element = modelElements[i]
              // try {
              // var drawFunction = this.$eval('_draw' + element.type)
              // drawFunction(element)
              console.log(element)
              // this._drawStartEvent(element)
              // } catch(err) {console.log(err);}
              if (element.type === 'StartEvent') {
                this._drawStartEvent(element)
              } else if (element.type === 'EndEvent') {
                this._drawEndEvent(element)
              } else if (element.type === 'ServiceTask') {
                this._drawServiceTask(element)
              }
            }
            console.log(data)
            if (data.flows) {
              for (var j = 0; j < data.flows.length; j++) {
                var flow = data.flows[j]
                if (flow.type === 'sequenceFlow') {
                  this._drawFlow(flow)
                }
                // } else if (flow.type === 'association') {
                //   _drawAssociation(flow)
                // }
              }
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
