var ServiceParaPropertiesCtrl = ['$scope', '$modal', '$timeout', '$translate', function ($scope, $modal, $timeout, $translate) {

  // Config for the modal window
  var opts = {
    template: 'editor-app/configuration/ServiceProperties/service-para-popup.html?version=' + Date.now(),
    scope: $scope
  };

  // Open the dialog
  $modal(opts);
}];


var ServiceParaPopupCtrl = ['$rootScope', '$scope', '$http', '$q', '$translate', '$timeout', function ($rootScope, $scope, $http, $q, $translate, $timeout) {

  if ($scope.property.value !== undefined && $scope.property.value !== null) {
    // console.log($scope.property)
    // $scope.atomicService

    // 保存的属性
    $scope.selectAtomicName = $scope.property.value.selectAtomicName

    $scope.atomicInput = angular.copy($scope.property.value.inputPara);
    // console.log($scope.atomicInput)
    $scope.atomicOutput = angular.copy($scope.property.value.outputPara);
  } else {
    $scope.atomicInput = [];
    $scope.atomicOutput = [];
  }

  $scope.inputPara = [];
  $scope.outputPara = [];

  $scope.selectedProperties = [];
  $scope.selectedAtomicService = [];

  $scope.translationsRetrieved = false;
  $scope.labels = {};

  var idPromise = $translate('PROPERTY.FORMPROPERTIES.ID');
  var namePromise = $translate('PROPERTY.FORMPROPERTIES.NAME');
  var typePromise = $translate('PROPERTY.FORMPROPERTIES.TYPE');

  $q.all([idPromise, namePromise, typePromise]).then(function (results) {
    $scope.labels.idLabel = results[0];
    $scope.labels.nameLabel = results[1];
    $scope.labels.typeLabel = results[2];

    $scope.atomicListData = [];
    $scope.atomicParaMap = new Map()
    //console.log($rootScope.selectedItem)
    //该微服务包含的原子服务列表
    var tmp = $rootScope.atomicService.get($rootScope.selectedItem.title);
    if (tmp.length > 0) {
      for (var i = 0; i < tmp.length; i++) {
        var item={}
        if(tmp[i].method==='MQ'){
          item = {
            name: tmp[i].serviceName,
            url: tmp[i].channel,
            method: tmp[i].method,
            asyncResultUrl: tmp[i].asyncResultUrl,
            description: tmp[i].description,
          }
        }
        else {
          item = {
            name: tmp[i].serviceName,
            url: tmp[i].url,
            method: tmp[i].method,
            asyncResultUrl: tmp[i].asyncResultUrl,
            description: tmp[i].description,
          }
        }
        var paraTmp = []
        if(tmp[i].uriParameters!==null){
          tmp[i].uriParameters.forEach((value, index, array) => {
            value.paraType = 'uriParameters'
            var deepCopy = {
              name: value.name,
              value: value.value,
              type: value.type,
              defaultValue: value.defaultValue,
              paraType: value.paraType,
              description: value.description
            }
            paraTmp.push(deepCopy)
          })
        }
        if(tmp[i].body!==null){
          tmp[i].body.forEach((value, index, array) => {
            value.paraType = 'body'
            var deepCopy = {
              name: value.name,
              value: value.value,
              type: value.type,
              defaultValue: value.defaultValue,
              paraType: value.paraType,
              description: value.description
            }
            paraTmp.push(deepCopy)
          })
        }
        if(tmp[i].queryParameters!==null){
          tmp[i].queryParameters.forEach((value, index, array) => {
            value.paraType = 'queryParameters'
            var deepCopy = {
              name: value.name,
              value: value.value,
              type: value.type,
              defaultValue: value.defaultValue,
              paraType: value.paraType,
              description: value.description
            }
            paraTmp.push(deepCopy)
          })
        }
        if(tmp[i].messageBody!==null){
          tmp[i].messageBody.forEach((value, index, array) => {
            value.paraType = 'messageBody'
            var deepCopy = {
              name: value.name,
              value: value.value,
              type: value.type,
              defaultValue: value.defaultValue,
              paraType: value.paraType,
              description: value.description
            }
            paraTmp.push(deepCopy)
          })
        }
        $scope.atomicParaMap.set(item.name, paraTmp)
        $scope.atomicListData.push(item)
      }
    }

    $scope.atomicListData.forEach(value => {
      if (value.name === $scope.selectAtomicName) {
        $scope.selectedAtomicService.push(value)

        //修改存在的属性
        $scope.atomicParaMap.get(value.name).forEach(para => {
          $scope.atomicInput.forEach(savePara => {
            if (para.paraType === savePara.paraType && para.name === savePara.name) {
              para.value = savePara.value
            }
          })
        })
      }
    })


    $scope.atomicList = {
      data: 'atomicListData',
      enableRowReordering: true,
      headerRowHeight: 28,
      multiSelect: false,
      keepLastSelected: true,
      selectedItems: $scope.selectedAtomicService,
      showSelectionCheckbox: true,//每行显示checkbox
      columnDefs: [{field: 'name', displayName: 'name', width: '15%'},
        {field: 'url', displayName: 'url', width: '35%'},
        {field: 'method', displayName: 'method', width: '15%'},
        {field: 'asyncResultUrl', displayName: 'asyncResultUrl', width: '35%'}]
    };

    $scope.$watch('selectedAtomicService', function () {
      if ($scope.selectedAtomicService.length > 0) {
        $scope.inputPara = $scope.atomicParaMap.get($scope.selectedAtomicService[0].name) //这里可能没有属性
        $scope.inputPara.forEach(para=>{
          // console.log(para.value);
          // console.log(typeof(para.value))
          if(para.value!==''&&(typeof(para.value)==='object')&&!Array.isArray(para.value)&&(para.type==='list'||para.type==='object'||para.type==='file'||para.type==='path')){
            para.value =  JSON.stringify(para.value, null, 2);
            console.log(para.value);
          }
          if(para.value!==''&&(typeof(para.value)==='object')&&Array.isArray(para.value)&&(para.type==='list'||para.type==='object'||para.type==='file'||para.type==='path')){
            //para.value =  JSON.stringify(JSON.parse(JSON.stringify(["111111"], null, 2)));
            para.value =  JSON.stringify(para.value, null, 2);
            console.log(para.value);
          }
        })
      }
    }, true);

    $scope.inPutOptions = {
      data: 'inputPara',
      enableRowReordering: true,
      headerRowHeight: 28,
      multiSelect: false,
      keepLastSelected: true,
      selectedItems: $scope.selectedProperties,
      columnDefs: [
        {field: 'paraType', displayName: 'ParaType', width: '25%'},
        {field: 'name', displayName: 'name', width: '25%'},
        {field: 'value', displayName: 'value', width: '25%'},
        {field: 'type', displayName: 'type', width: '25%'}]
    };

    $scope.outPutOptions = {
      data: 'outputPara',
      enableRowReordering: true,
      headerRowHeight: 28,
      multiSelect: false,
      keepLastSelected: true,
      selectedItems: $scope.selectedProperties,
      columnDefs: [{field: 'name', displayName: 'name', width: '25%'},
        {field: 'value', displayName: 'value', width: '25%'},
        {field: 'type', displayName: 'type', width: '25%'},
        {field: 'scope', displayName: 'scope', width: '25%'}]
    };

    $scope.translationsRetrieved = true;
  });

  // Handler for when the value of the type dropdown changes
  $scope.propertyTypeChanged = function () {

    // Check date. If date, show date pattern
    if ($scope.selectedProperties[0].type === 'date') {
      $scope.selectedProperties[0].datePattern = 'MM-dd-yyyy hh:mm';

    } else {
      delete $scope.selectedProperties[0].datePattern;
    }

    // Check enum. If enum, show list of options
    if ($scope.selectedProperties[0].type === 'enum') {
      $scope.selectedProperties[0].enumValues = [{id: 'value1', name: 'Value 1'}, {id: 'value2', name: 'Value 2'}];

    } else {
      delete $scope.selectedProperties[0].enumValues;
    }
  };

  // Click handler for add button
  var propertyIndex = 1;
  $scope.addInputProperty = function () {
    $scope.inputPara.push({
      scope: 'execution',
      description: 'Custom Input Parameter',
      value: '',
      name: 'input_' + propertyIndex++,
      type: 'long'
    });

    $timeout(function () {
      $scope.inPutOptions.selectItem($scope.inputPara.length - 1, true);
    });
  };

  // Click handler for remove button
  $scope.removeInputProperty = function () {
    if ($scope.selectedProperties.length > 0) {
      var index = $scope.inputPara.indexOf($scope.selectedProperties[0]);
      $scope.inPutOptions.selectItem(index, false);
      $scope.inputPara.splice(index, 1);

      $scope.selectedProperties.length = 0;
      if (index < $scope.inputPara.length) {
        $scope.inPutOptions.selectItem(index + 1, true);
      } else if ($scope.formProperties.length > 0) {
        $scope.inPutOptions.selectItem(index - 1, true);
      }
    }
  };


  // Click handler for add button
  var propertyOutputIndex = 1;
  $scope.addOutputProperty = function () {
    $scope.outputPara.push({
      scope: 'execution',
      description: 'Custom Output Parameter',
      value: '',
      name: 'output_' + propertyOutputIndex++,
      type: 'long'
    });

    $timeout(function () {
      $scope.outPutOptions.selectItem($scope.outputPara.length - 1, true);
    });
  };

  // Click handler for remove button
  $scope.removeOutputProperty = function () {
    if ($scope.selectedProperties.length > 0) {
      var index = $scope.outputPara.indexOf($scope.selectedProperties[0]);
      $scope.outPutOptions.selectItem(index, false);
      $scope.outputPara.splice(index, 1);

      $scope.selectedProperties.length = 0;
      if (index < $scope.outputPara.length) {
        $scope.outPutOptions.selectItem(index + 1, true);
      } else if ($scope.outputPara.length > 0) {
        $scope.outPutOptions.selectItem(index - 1, true);
      }
    }
  };


  // Click handler for up button
  $scope.movePropertyUp = function () {
    if ($scope.selectedProperties.length > 0) {
      var index = $scope.formProperties.indexOf($scope.selectedProperties[0]);
      if (index != 0) { // If it's the first, no moving up of course
        // Reason for funny way of swapping, see https://github.com/angular-ui/ng-grid/issues/272
        var temp = $scope.formProperties[index];
        $scope.formProperties.splice(index, 1);
        $timeout(function () {
          $scope.formProperties.splice(index + -1, 0, temp);
        }, 100);

      }
    }
  };

  // Click handler for down button
  $scope.movePropertyDown = function () {
    if ($scope.selectedProperties.length > 0) {
      var index = $scope.formProperties.indexOf($scope.selectedProperties[0]);
      if (index != $scope.formProperties.length - 1) { // If it's the last element, no moving down of course
        // Reason for funny way of swapping, see https://github.com/angular-ui/ng-grid/issues/272
        var temp = $scope.formProperties[index];
        $scope.formProperties.splice(index, 1);
        $timeout(function () {
          $scope.formProperties.splice(index + 1, 0, temp);
        }, 100);

      }
    }
  };

  $scope.addNewEnumValue = function () {
    if ($scope.selectedProperties.length > 0) {
      $scope.selectedProperties[0].enumValues.push({id: '', name: ''});
    }

    $timeout(function () {
      $scope.enumGridOptions.selectItem($scope.selectedProperties[0].enumValues.length - 1, true);
    });
  };

  // Click handler for remove button
  $scope.removeEnumValue = function () {
    if ($scope.selectedProperties.length > 0 && $scope.selectedEnumValues.length > 0) {
      var index = $scope.selectedProperties[0].enumValues.indexOf($scope.selectedEnumValues[0]);
      $scope.enumGridOptions.selectItem(index, false);
      $scope.selectedProperties[0].enumValues.splice(index, 1);

      $scope.selectedEnumValues.length = 0;
      if (index < $scope.selectedProperties[0].enumValues.length) {
        $timeout(function () {
          $scope.enumGridOptions.selectItem(index + 1, true);
        });

      } else if ($scope.selectedProperties[0].enumValues.length > 0) {
        $timeout(function () {
          $scope.enumGridOptions.selectItem(index - 1, true);
        });
      }
    }
  };

  // Click handler for up button
  $scope.moveEnumValueUp = function () {
    if ($scope.selectedProperties.length > 0 && $scope.selectedEnumValues.length > 0) {
      var index = $scope.selectedProperties[0].enumValues.indexOf($scope.selectedEnumValues[0]);
      if (index != 0) { // If it's the first, no moving up of course
        // Reason for funny way of swapping, see https://github.com/angular-ui/ng-grid/issues/272
        var temp = $scope.selectedProperties[0].enumValues[index];
        $scope.selectedProperties[0].enumValues.splice(index, 1);
        $timeout(function () {
          $scope.selectedProperties[0].enumValues.splice(index + -1, 0, temp);
        });

      }
    }
  };

  // Click handler for down button
  $scope.moveEnumValueDown = function () {
    if ($scope.selectedProperties.length > 0 && $scope.selectedEnumValues.length > 0) {
      var index = $scope.selectedProperties[0].enumValues.indexOf($scope.selectedEnumValues[0]);
      if (index != $scope.selectedProperties[0].enumValues.length - 1) { // If it's the last element, no moving down of course
        // Reason for funny way of swapping, see https://github.com/angular-ui/ng-grid/issues/272
        var temp = $scope.selectedProperties[0].enumValues[index];
        $scope.selectedProperties[0].enumValues.splice(index, 1);
        $timeout(function () {
          $scope.selectedProperties[0].enumValues.splice(index + 1, 0, temp);
        });

      }
    }
  };

  $scope.fileChanged = function (ele) {
    $scope.files = ele.files;
    var filename = $scope.files[0].name;
    console.log(filename);
    //console.log($scope.selectedProperties[0].variable);

    $scope.selectedProperties[0].name = filename;
    $scope.$apply();
    console.log(222);
  }
  $scope.fileUpload = function () {
    var fd = new FormData();
    var file = document.getElementById("fileUpload").files[0];//$scope.dataFile;
    fd.append('file', file);

    $http({
      method: 'POST',
      url: KISBPM.URL.fileUpload(),
      data: fd,
      headers: {'Content-Type': undefined},
      transformRequest: angular.identity
    }).success(function (data) {
      alert('upload success');
      //console.log('upload success');
    }).error(function (data) {
      alert('upload fail');
    })

  }
  // Click handler for save button
  $scope.save = function () {
    // var saveInputProperties = []
    // console.log($scope.inputPara)

    // for (var i = 0; i < $scope.inputPara.length; i++) {
    //   var field = $scope.inputPara[i];
    //   saveInputProperties.push({
    //     name: field.name,
    //     value: field.value,
    //     type: field.type,
    //     // readable: true,
    //     // writable: true
    //   });
    // }
    //
    // var saveOutputProperties = []
    // for (var i = 0; i < $scope.outputPara.length; i++) {
    //   var field = $scope.outputPara[i];
    //   saveOutputProperties.push({
    //     name: field.name,
    //     value: field.value,
    //     type: field.type,
    //     // readable: true,
    //     // writable: true
    //   });
    // }
    if ($scope.inputPara.length > 0) {
      $scope.property.value = {};
      $scope.property.value.selectAtomicName = $scope.selectedAtomicService[0].name;
      $scope.property.value.inputPara = angular.copy($scope.inputPara);
      // $scope.property.value.outputPara = $scope.outputPara;
      $scope.property.value.inputPara.forEach(para=>{
        console.log(para.value);
        console.log(typeof(para.value));
        if(para.value!==''&&typeof(para.value)==='string'&&(para.type==='list'||para.type==='object'||para.type==='file'||para.type==='path')){
          if(para.value.substr(0,1)!=='$')
            para.value = JSON.parse(para.value)
        }
      })
      console.log($scope.property.value)
    } else {
      $scope.property.value.selectAtomicName = $scope.selectedAtomicService[0].name;
    }
    for (var i = 0; i < ($rootScope.selectedItem.properties).length; i++) {
      var currentProperty = $rootScope.selectedItem.properties[i];
      if (currentProperty.key === 'oryx-name') {
        currentProperty.value = $rootScope.selectedItem.title + ':' + $scope.property.value.selectAtomicName
        $rootScope.updatePropertyInModel(currentProperty);
        break;
      }
    }

    $scope.updatePropertyInModel($scope.property);
    // console.log($scope.property.value)
    $scope.close();
  };

  $scope.cancel = function () {
    $scope.$hide();
    $scope.property.mode = 'read';
  };

  // Close button handler
  $scope.close = function () {
    $scope.$hide();
    $scope.property.mode = 'read';
  };

}];
