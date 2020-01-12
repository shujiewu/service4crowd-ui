

var KisBpmMergeFieldsCtrl = ['$scope', '$modal', '$timeout', '$translate', function ($scope, $modal, $timeout, $translate) {
  // Config for the modal window
  var opts = {
    template: 'editor-app/configuration/ServiceProperties/merge-fields-popup.html',
    scope: $scope
  };
  // Open the dialog
  $modal(opts);
}];

var KisBpmMergeFieldsPopupCtrl = ['$scope', '$q', '$translate', '$http', function ($scope, $q, $translate, $http) {

  // Put json representing form properties on scope
  $scope.selectShapeName = $scope.selectedShape.properties['oryx-name']
  $scope.selectServiceType = $scope.selectedShape.properties['oryx-servicetasktype']
  if ($scope.property.value !== undefined && $scope.property.value !== null && $scope.property.value.fields !== undefined && $scope.property.value.fields !== null) {
    $scope.fields = angular.copy($scope.property.value.fields);
  } else {
    $scope.fields = [];
  }

  // Array to contain selected properties (yes - we only can select one, but ng-grid isn't smart enough)
  $scope.selectedFields = [];
  $scope.translationsRetrieved = false;
  $scope.labels = {};
  $scope.selectedMethod = [];

  $http({method: 'GET', url: KISBPM.URL.getTruthInference()}).success(function (data, status, headers, config) {
    $scope.truthInference = data.data.rows
    $scope.truthInferenceReady = true;
    $scope.selectMethodId =''
    $scope.selectMethodIndex=1

    $scope.methodGrid = {
      data: 'truthInference',
      enableRowReordering: true,
      headerRowHeight: 28,
      multiSelect: false,
      keepLastSelected: false,
      selectedItems: $scope.selectedMethod,
      showSelectionCheckbox: true,//每行显示checkbox
      columnDefs: [{field: 'method', displayName:"Method"},
        {field: 'taskType', displayName:"Task Types"},
        {field: 'taskModel', displayName: "Task Modeling"},
        {field: 'workerModel', displayName: "Worker Modeling"},
        {field: 'technique', displayName: "Techniques"},
        {field: 'implType', displayName:"Implementation"}
      ]
    };

    if($scope.fields.length>0){
        $scope.fields.forEach((value,index,array)=>{
          if(value.name==='Method'){
            $scope.selectMethodId =value.stringValue
            $scope.fields.splice(index,1)
            $scope.selectMethodIndex = index
          }
        })
        $scope.truthInference.forEach((value,index,array)=>{
          if(value.id=== $scope.selectMethodId){
            //console.log($scope.truthInference[index].serviceProperty)
            //console.log($scope.fields)
            if($scope.truthInference[index].serviceProperty!==null){
              for(var i =0;i<$scope.truthInference[index].serviceProperty.length;i++){
                //console.log($scope.fields[i])
                $scope.truthInference[index].serviceProperty[i].value=$scope.fields[i].stringValue
              }
            }
            // $scope.truthInference[index].serviceProperty.forEach((value,index,array)=>{
            //   $scope.truthInference[index].serviceProperty[index].value=$scope.fields[index].implementation
            // })
            $scope.selectedMethod.push($scope.truthInference[index])
          }
        })
    }



    console.log($scope.truthInference)
    $scope.gridOptions = {
      data: 'fields',
      enableRowReordering: true,
      headerRowHeight: 28,
      multiSelect: false,
      keepLastSelected: false,
      selectedItems: $scope.selectedFields,
      columnDefs: [{field: 'name', displayName: "name"},
        {field: 'implementation',displayName: "implementation"}]
    };
    $scope.translationsRetrieved = true;
    $scope.$watch('selectedMethod', function () {
      if ($scope.selectedMethod.length > 0) {
        // console.log($scope.gridOptions)
        $scope.fields=[]
        if($scope.selectedMethod[0].serviceProperty !==null){

          $scope.selectedMethod[0].serviceProperty.forEach((value)=>{
            //$scope.fields.push(value)
            $scope.fields= $scope.fields.concat(JSON.parse(JSON.stringify(value)));
          })
          console.log( $scope.fields)
          $scope.fields.forEach((value)=>{
            value['implementation'] = value['value'];
            delete value['value'];
            value['stringValue'] = value['implementation']
            //console.log($scope.fields)
          })
          //console.log($scope.fields)
        }
      }
    }, true);

  }).error(function (data, status, headers, config) {
    console.log('Error loading metaData');
  });

  function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  }
  //
  // // var dataUrl = KISBPM.URL.getModel(modelId);
  // if ($scope.selectShapeName === 'LoadData') {
  //   $scope.selectedMeta = [];
  //   $scope.selectedAnswerData = [];
  //   $scope.dataSetType = 'CrowdData'
  //   $http({method: 'GET', url: KISBPM.URL.getMetaList()}).success(function (data, status, headers, config) {
  //
  //     $scope.metaData = data.data.rows
  //     // console.log($scope.metaData );
  //
  //     for (var i = 0; i < $scope.metaData.length; i++) {
  //       $scope.metaData[i].createTime = parseTime($scope.metaData[i].createTime, '{y}-{m}-{d} {h}:{i}')
  //     }
  //     $scope.dataBase = {
  //       data: 'metaData',
  //       headerRowHeight: 28,
  //       enableRowSelection: true,
  //       enableRowHeaderSelection: false,
  //       multiSelect: false,
  //       modifierKeysToMultiSelect: false,
  //       enableHorizontalScrollbar: 0,
  //       enableColumnMenus: false,
  //       enableSorting: false,
  //       selectedItems: $scope.selectedMeta,
  //       columnDefs: [{field: 'metaName', displayName: 'MetaName'},
  //         {field: 'type', displayName: 'Type'},
  //         {field: 'createTime', displayName: 'CreateTime'}]
  //     };
  //     $scope.$watch('selectedMeta', function () {
  //       if ($scope.selectedMeta.length > 0) {
  //         $scope.selectedFields[0].implementation = $scope.selectedMeta[0].metaName
  //         $scope.selectedFields[0].stringValue = $scope.selectedMeta[0].metaName
  //       }
  //
  //     }, true);
  //
  //   }).error(function (data, status, headers, config) {
  //     console.log('Error loading metaData');
  //   });
  //
  //   $scope.$watch("dataSetType", function (n, o) {
  //     // console.log($scope.gridOptions)
  //     if (n != o) {
  //       $scope.selectedFields[0].implementation = $scope.dataSetType
  //       $scope.selectedFields[0].stringValue = $scope.dataSetType
  //     }
  //   });
  //
  //   $http({method: 'GET', url: KISBPM.URL.getAnswerDataList()}).success(function (data, status, headers, config) {
  //
  //     $scope.answerData = data.data.rows
  //     console.log($scope.answerData);
  //
  //     for (var i = 0; i < $scope.answerData.length; i++) {
  //       $scope.answerData[i].createTime = parseTime($scope.answerData[i].createTime, '{y}-{m}-{d} {h}:{i}')
  //     }
  //     $scope.answerDataBase = {
  //       data: 'answerData',
  //       headerRowHeight: 28,
  //       enableRowSelection: true,
  //       enableRowHeaderSelection: false,
  //       multiSelect: false,
  //       modifierKeysToMultiSelect: false,
  //       enableHorizontalScrollbar: 0,
  //       enableColumnMenus: false,
  //       enableSorting: false,
  //       selectedItems: $scope.selectedAnswerData,
  //       columnDefs: [
  //         {field: 'id', displayName: 'ID'},
  //         {field: 'name', displayName: 'Name'},
  //         {field: 'hasGold', displayName: 'HasGold'},
  //         {field: 'createTime', displayName: 'CreateTime'}]
  //     };
  //     $scope.$watch('selectedAnswerData', function () {
  //       if ($scope.selectedAnswerData.length > 0) {
  //         $scope.selectedFields[0].implementation = $scope.selectedAnswerData[0].id
  //         $scope.selectedFields[0].stringValue = $scope.selectedAnswerData[0].id
  //       }
  //     }, true);
  //   }).error(function (data, status, headers, config) {
  //     console.log('Error loading answerData');
  //   });
  // }
  // $scope.fileChanged = function (ele) {
  //   $scope.files = ele.files;
  //   var filename = $scope.files[0].name;
  //   //console.log($scope.selectedProperties[0].variable);
  //   $scope.selectedFields[0].implementation = filename;
  //   $scope.$apply();
  // }
  //
  // $scope.fieldNameChanged = function () {
  //   $scope.selectedFields[0].implementation = $scope.selectedFields[0].string;
  // };
  //
  $scope.fieldDetailsChanged = function () {
    if ($scope.selectedFields[0].stringValue != '') {
      $scope.selectedFields[0].implementation = $scope.selectedFields[0].stringValue;
    }
    else if ($scope.selectedFields[0].expression != '') {
      $scope.selectedFields[0].implementation = $scope.selectedFields[0].expression;
    }
    else if ($scope.selectedFields[0].string != '') {
      $scope.selectedFields[0].implementation = $scope.selectedFields[0].string;
    }
    else {
      $scope.selectedFields[0].implementation = '';
    }
  };

  // Click handler for add button
  $scope.addNewField = function () {
    $scope.fields.push({
      name: 'fieldName',
      implementation: '',
      stringValue: '',
      expression: '',
      string: ''
    });
  };

  // Click handler for remove button
  $scope.removeField = function () {
    if ($scope.selectedFields.length > 0) {
      var index = $scope.fields.indexOf($scope.selectedFields[0]);
      $scope.gridOptions.selectItem(index, false);
      $scope.fields.splice(index, 1);

      $scope.selectedFields.length = 0;
      if (index < $scope.fields.length) {
        $scope.gridOptions.selectItem(index + 1, true);
      } else if ($scope.fields.length > 0) {
        $scope.gridOptions.selectItem(index - 1, true);
      }
    }
  };

  // Click handler for up button
  $scope.moveFieldUp = function () {
    if ($scope.selectedFields.length > 0) {
      var index = $scope.fields.indexOf($scope.selectedFields[0]);
      if (index != 0) { // If it's the first, no moving up of course
        // Reason for funny way of swapping, see https://github.com/angular-ui/ng-grid/issues/272
        var temp = $scope.fields[index];
        $scope.fields.splice(index, 1);
        $timeout(function () {
          $scope.fields.splice(index + -1, 0, temp);
        }, 100);

      }
    }
  };

  // Click handler for down button
  $scope.moveFieldDown = function () {
    if ($scope.selectedFields.length > 0) {
      var index = $scope.fields.indexOf($scope.selectedFields[0]);
      if (index != $scope.fields.length - 1) { // If it's the last element, no moving down of course
        // Reason for funny way of swapping, see https://github.com/angular-ui/ng-grid/issues/272
        var temp = $scope.fields[index];
        $scope.fields.splice(index, 1);
        $timeout(function () {
          $scope.fields.splice(index + 1, 0, temp);
        }, 100);

      }
    }
  };

  // Click handler for save button
  $scope.save = function () {
    if($scope.selectedMethod.length>0){
      $scope.fields.push({
        name: 'Method',
        implementation: '',
        stringValue: $scope.selectedMethod[0].id,
        expression: '',
        string: ''
      })
    }
    if ($scope.fields.length > 0) {
      $scope.property.value = {};
      console.log($scope.fields)
      $scope.property.value.fields = $scope.fields;
    } else {
      $scope.property.value = null;
    }

    $scope.updatePropertyInModel($scope.property);
    $scope.close();
  };

  $scope.cancel = function () {
    $scope.close();
  };

  // Close button handler
  $scope.close = function () {
    $scope.property.mode = 'read';
    $scope.$hide();
  };
}];
