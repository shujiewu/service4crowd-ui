var ServiceOutputPropertiesCtrl = ['$scope', '$modal', '$timeout', '$translate', function ($scope, $modal, $timeout, $translate) {

  // Config for the modal window
  var opts = {
    template: 'editor-app/configuration/ServiceProperties/service-output-popup.html?version=' + Date.now(),
    scope: $scope
  };

  // Open the dialog
  $modal(opts);
}];


var ServiceOutputPopupCtrl = ['$rootScope', '$scope', '$http', '$q', '$translate', '$timeout', function ($rootScope, $scope, $http, $q, $translate, $timeout) {
  $scope._objToStrMap = function (obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }
  /**
   *json转换为map
   */
  $scope._jsonToMap = function (jsonStr) {
    return this._objToStrMap(jsonStr);
  }

  $scope._strMapToObj = function (strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  $scope._mapToJson = function (map) {
    return this._strMapToObj(map);
  }


  if ($scope.property.value !== undefined && $scope.property.value !== null) {
    // console.log($scope.property)
    // $scope.atomicService

    // 保存的属性
    ///console.log($scope.property.value)
    $scope.selectAtomicName = $scope.property.value.selectAtomicName
    $scope.syncResponseMap = $scope._jsonToMap($scope.property.value.syncResponseMap);
    $scope.asyncResponseMap = $scope._jsonToMap($scope.property.value.asyncResponseMap);

  }
  $scope.newAtomic = false

  for (var i = 0; i < ($rootScope.selectedItem.properties).length; i++) {
    //console.log(11)
    var currentProperty = $rootScope.selectedItem.properties[i];
    if (currentProperty.key === 'oryx-servicepara') {
      if (currentProperty.value.selectAtomicName !== $scope.selectAtomicName) {
        $scope.selectAtomicName = currentProperty.value.selectAtomicName
        $scope.newAtomic = true
      }
    }
  }
  //console.log($scope.syncResponseMap)

  $scope.hasAsync = false
  if ($scope.newAtomic||($scope.syncResponseMap === null || $scope.syncResponseMap === undefined || $scope.syncResponseMap.size === 0)) {
    $scope.syncResponseMap = new Map()
    // $scope.asyncResponseMap = new Map()

    var tmp = $rootScope.atomicService.get($rootScope.selectedItem.title);
    if (tmp.length > 0) {
      for (var i = 0; i < tmp.length; i++) {
        console.log(tmp[i])
        // console.log($rootScope.atomicService)
        if (tmp[i].serviceName === $scope.selectAtomicName) {
          if (tmp[i].serviceResponses !== undefined&&tmp[i].serviceResponses !== null && tmp[i].serviceResponses.length > 0){
            tmp[i].serviceResponses.forEach((value, index, array) => {
              var item = {
                description: value.description,
                data: []
              }
              value.body.forEach((para, index, array) => {
                var paraItem = {
                  defaultValue: para.defaultValue,
                  description: para.description,
                  name: para.name,
                  rename: para.rename,
                  scope: para.scope,
                  type: para.type,
                  value: para.value
                }
                item.data.push(paraItem)
              })

              $scope.syncResponseMap.set(value.status.toString(), item)
            })
          }

          // if (tmp[i].asyncServiceResponses !== undefined &&tmp[i].asyncServiceResponses !== null&& tmp[i].asyncServiceResponses.length > 0) {
          //   $scope.hasAsync = true
          //   tmp[i].asyncServiceResponses.forEach((value, index, array) => {
          //     var item = {
          //       description: value.description,
          //       data: []
          //     }
          //     value.body.forEach((para, index, array) => {
          //       var paraItem = {
          //         defaultValue: para.defaultValue,
          //         description: para.description,
          //         name: para.name,
          //         rename: para.rename,
          //         scope: para.scope,
          //         type: para.type,
          //         value: para.value
          //       }
          //       item.data.push(paraItem)
          //     })
          //     $scope.asyncResponseMap.set(value.status.toString(), item)
          //   })
          // }
          break;
        }
      }
    }
  }

  if ($scope.newAtomic||($scope.asyncResponseMap === null || $scope.asyncResponseMap === undefined || $scope.asyncResponseMap.size === 0)) {
    $scope.asyncResponseMap = new Map()

    var tmp = $rootScope.atomicService.get($rootScope.selectedItem.title);
    if (tmp.length > 0) {
      for (var i = 0; i < tmp.length; i++) {
        // console.log($rootScope.atomicService)
        if (tmp[i].serviceName === $scope.selectAtomicName) {
          if (tmp[i].asyncServiceResponses !== undefined &&tmp[i].asyncServiceResponses !== null&& tmp[i].asyncServiceResponses.length > 0) {
            $scope.hasAsync = true
            tmp[i].asyncServiceResponses.forEach((value, index, array) => {
              var item = {
                description: value.description,
                data: []
              }
              value.body.forEach((para, index, array) => {
                var paraItem = {
                  defaultValue: para.defaultValue,
                  description: para.description,
                  name: para.name,
                  rename: para.rename,
                  scope: para.scope,
                  type: para.type,
                  value: para.value
                }
                item.data.push(paraItem)
              })
              $scope.asyncResponseMap.set(value.status.toString(), item)
            })
          }
          break;
        }
      }
    }
  }


  $scope.outputPara = [];

  $scope.selectedSyncBody = [];
  $scope.selectedAsyncBody = [];

  $scope.syncStatus = [];
  $scope.syncResponseMap.forEach(function (value, key, map) {
    $scope.syncStatus.push(key)
  })

  $scope.asyncStatus = [];
  if($scope.asyncResponseMap.size!==0){
    $scope.hasAsync =true
    $scope.asyncResponseMap.forEach(function (value, key, map) {
      $scope.asyncStatus.push(key)
    })
  }

  $scope.selectedSyncStatus = $scope.syncStatus[0]
  $scope.selectedAsyncStatus = $scope.asyncStatus[0]

  $scope.selectedSyncDescription = ''

  $scope.translationsRetrieved = false;
  $scope.labels = {};


  var idPromise = $translate('PROPERTY.FORMPROPERTIES.ID');
  var namePromise = $translate('PROPERTY.FORMPROPERTIES.NAME');
  var typePromise = $translate('PROPERTY.FORMPROPERTIES.TYPE');

  $q.all([idPromise, namePromise, typePromise]).then(function (results) {
    $scope.labels.idLabel = results[0];
    $scope.labels.nameLabel = results[1];
    $scope.labels.typeLabel = results[2];

    //该微服务包含的原子服务列表


    // $scope.atomicListData.forEach(value => {
    //   if(value.name === $scope.selectAtomicName){
    //     $scope.selectedAtomicService.push(value)
    //
    //     //修改存在的属性
    //     $scope.atomicParaMap.get(value.name).forEach(para => {
    //       $scope.atomicInput.forEach(savePara=>{
    //         if(para.paraType === savePara.paraType && para.name === savePara.name){
    //           para.value =  savePara.value
    //         }
    //       })
    //     })
    //   }
    // })
    $scope.$watch('selectedSyncStatus', function () {
      $scope.syncResponse = []
      if ($scope.syncResponseMap.get($scope.selectedSyncStatus) !== undefined) {
        // console.log($scope.syncResponseMap.get($scope.selectedSyncStatus))
        $scope.syncResponse = ($scope.syncResponseMap.get($scope.selectedSyncStatus)).data
        $scope.selectedSyncDescription = ($scope.syncResponseMap.get($scope.selectedSyncStatus)).description

      }
    }, true);

    $scope.$watch('selectedAsyncStatus', function () {

      $scope.asyncResponse = []
      if ($scope.asyncResponseMap.get($scope.selectedAsyncStatus) !== undefined) {
        // console.log($scope.syncResponseMap.get($scope.selectedSyncStatus))
        $scope.asyncResponse = ($scope.asyncResponseMap.get($scope.selectedAsyncStatus)).data
        $scope.selectedAsyncDescription = ($scope.asyncResponseMap.get($scope.selectedAsyncStatus)).description

        console.log($scope.asyncResponse)
      }
    }, true);

    $scope.syncResponse = {
      data: 'syncResponse',
      enableRowReordering: true,
      headerRowHeight: 28,
      multiSelect: false,
      keepLastSelected: true,
      selectedItems: $scope.selectedSyncBody,
      columnDefs: [
        {field: 'name', displayName: 'name', width: '25%'},
        {field: 'type', displayName: 'type', width: '25%'},
        {field: 'rename', displayName: 'rename', width: '25%'},
        {field: 'scope', displayName: 'scope', width: '25%'}]
    };

    $scope.asyncResponse = {
      data: 'asyncResponse',
      enableRowReordering: true,
      headerRowHeight: 28,
      multiSelect: false,
      keepLastSelected: true,
      selectedItems: $scope.selectedAsyncBody,
      columnDefs: [
        {field: 'name', displayName: 'name', width: '25%'},
        {field: 'type', displayName: 'type', width: '25%'},
        {field: 'rename', displayName: 'rename', width: '25%'},
        {field: 'scope', displayName: 'scope', width: '25%'}]
    };
    $scope.translationsRetrieved = true;
  });
  // $scope.syncResponseChange = function () {
  //   $scope.selectedSyncDescription =
  // };
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


  // Click handler for save button
  $scope.save = function () {
    if ($scope.syncResponseMap.size > 0 || $scope.asyncResponseMap.size > 0) {
      $scope.property.value = {};
      $scope.property.value.selectAtomicName = $scope.selectAtomicName;
      $scope.property.value.syncResponseMap = $scope._mapToJson($scope.syncResponseMap);
      $scope.property.value.asyncResponseMap = $scope._mapToJson($scope.asyncResponseMap);
      //console.log($scope.syncResponseMap)
    } else {
      $scope.property.value.selectAtomicName = $scope.selectAtomicName;
      // $scope.property.value = null;
    }
    $scope.updatePropertyInModel($scope.property);
    //console.log($scope.property.value)
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
