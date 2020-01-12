/*
 * Activiti Modeler component part of the Activiti project
 * Copyright 2005-2014 Alfresco Software, Ltd. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

/*
 * Form Properties
 */

var KisBpmSimPropertiesCtrl = ['$scope', '$modal', '$timeout', '$translate', function ($scope, $modal, $timeout, $translate) {

  // Config for the modal window
  var opts = {
    template: 'editor-app/configuration/properties/sim-properties-popup.html?version=' + Date.now(),
    scope: $scope
  };

  // Open the dialog
  $modal(opts);
}];


var KisBpmSimPropertiesPopupCtrl = ['$scope', '$http', '$q', '$translate', '$timeout', function ($scope, $http, $q, $translate, $timeout) {

  // console.log($scope.property)
  // Put json representing form properties on scope
  if ($scope.property.value !== undefined && $scope.property.value !== null
    && $scope.property.value.formProperties !== undefined
    && $scope.property.value.formProperties !== null) {
    // Note that we clone the json object rather then setting it directly,
    // this to cope with the fact that the user can click the cancel button and no changes should have happended
    $scope.oldFormProperties = angular.copy($scope.property.value.formProperties);

    // for (var i = 0; i < $scope.formProperties.length; i++) {
    //   var formProperty = $scope.formProperties[i];
    //   if (formProperty.enumValues && formProperty.enumValues.length > 0) {
    //     for (var j = 0; j < formProperty.enumValues.length; j++) {
    //       var enumValue = formProperty.enumValues[j];
    //       if (!enumValue.id && !enumValue.name && enumValue.value) {
    //         enumValue.id = enumValue.value;
    //         enumValue.name = enumValue.value;
    //       }
    //     }
    //   }
    // }

  } else {
    $scope.oldFormProperties = [];

  }

  // Array to contain selected properties (yes - we only can select one, but ng-grid isn't smart enough)
  $scope.selectedProperties = [];
  $scope.selectedEnumValues = [];

  $scope.translationsRetrieved = false;

  $scope.labels = {};

  $scope.auto_order_type = '1';

  var idPromise = $translate('PROPERTY.FORMPROPERTIES.ID');
  var namePromise = $translate('PROPERTY.FORMPROPERTIES.NAME');
  var typePromise = $translate('PROPERTY.FORMPROPERTIES.TYPE');

  $q.all([idPromise, namePromise, typePromise]).then(function (results) {
    $scope.labels.idLabel = results[0];
    $scope.labels.nameLabel = results[1];
    $scope.labels.typeLabel = results[2];
    // $scope.translationsRetrieved = true;
    console.log($scope)
    $scope.newForm = true
    // if ($scope.oldFormProperties.length == 0) {
      $http({
        method: 'GET',
        url: KISBPM.URL.getServiceProperty("SimulatorTask")
      }).success(function (data, status, headers, config) {
        $scope.formProperties = data.fields
        // Config for grid
        // for (var i = 0; i < $scope.formKeyData.length; i++) {
        //   $scope.formKeyData[i].lastUpdateTime = parseTime($scope.formKeyData[i].lastUpdateTime, '{y}-{m}-{d} {h}:{i}')
        // }
        $scope.newForm = true
        var child1 = [];
        var child2 = [];
        for (var i = 0; i < $scope.formProperties.length; i++) {
          var field = $scope.formProperties[i];
          // if()
          if($scope.oldFormProperties.length!==0){
            $scope.formProperties[i].value = $scope.oldFormProperties[i].name
          }
          if (field.name === 'variable_judgments_mode') {
            $scope.variable_judgments_mode_type = field.value;
          }
          if (field.name === 'max_judgments_per_unit' || field.name === 'min_unit_confidence' || field.name === 'expected_judgments_per_unit') {
            child1.push(field);
            $scope.formProperties.splice(i, 1);
            i--;
          }
          if (field.name === 'auto_order_timeout' || field.name === 'auto_order_threshold') {
            child2.push(field);
            $scope.formProperties.splice(i, 1);
            i--;
          }
        }
        $scope.child11 = child1;
        $scope.child22 = child2;
        // console.log(child1)
        // console.log(child2)


        // console.log($scope.formProperties)
        $scope.gridOptions = {
          data: 'formProperties',
          enableRowReordering: true,
          headerRowHeight: 28,
          multiSelect: false,
          keepLastSelected: true,
          selectedItems: $scope.selectedProperties,
          columnDefs: [{field: 'name', displayName: 'name', width: '40%'},
            {field: 'value', displayName: 'value', width: '30%'},
            {field: 'type', displayName: 'type', width: '30%'}]
        };
        $scope.translationsRetrieved = true;
        // $scope.$watch('selectedMeta', function () {
        //   if($scope.selectedMeta.length > 0)
        //     $scope.selectedFields[0].implementation= $scope.selectedMeta[0].metaName
        // },true);
      }).error(function (data, status, headers, config) {
        console.log('Error loading uiData');
      });
    // }
    // else {
    //   $scope.newForm = false
    //   $scope.formProperties = [];
    //   for (var i = 0; i < $scope.oldFormProperties.length; i++) {
    //     var field = $scope.oldFormProperties[i];
    //     $scope.formProperties.push({
    //       name: field.id,
    //       value: field.name,
    //       type: field.type,
    //       readable: true,
    //       writable: true
    //     });
    //
    //     var child1 = [];
    //     var child2 = [];
    //     var field = $scope.formProperties[i];
    //     // if()
    //     if (field.name === 'variable_judgments_mode') {
    //       $scope.variable_judgments_mode_type = field.value;
    //     }
    //     if (field.name === 'max_judgments_per_unit' || field.name === 'min_unit_confidence' || field.name === 'expected_judgments_per_unit') {
    //       child1.push(field);
    //       $scope.formProperties.splice(i, 1);
    //       i--;
    //     }
    //     if (field.name === 'auto_order_timeout' || field.name === 'auto_order_threshold') {
    //       child2.push(field);
    //       $scope.formProperties.splice(i, 1);
    //       i--;
    //     }
    //   }
    //   $scope.child11 = child1;
    //   $scope.child22 = child2;
    //
    //   $scope.gridOptions = {
    //     data: 'formProperties',
    //     enableRowReordering: true,
    //     headerRowHeight: 28,
    //     multiSelect: false,
    //     keepLastSelected: true,
    //     selectedItems: $scope.selectedProperties,
    //     columnDefs: [{field: 'name', displayName: 'name', width: '40%'},
    //       {field: 'value', displayName: 'value', width: '30%'},
    //       {field: 'type', displayName: 'type', width: '30%'}]
    //   };
    //   $scope.translationsRetrieved = true;
    // }

    // // Config for grid
    // $scope.gridOptions = {
    //   data: 'formProperties',
    //   enableRowReordering: true,
    //   headerRowHeight: 28,
    //   multiSelect: false,
    //   keepLastSelected: false,
    //   selectedItems: $scope.selectedProperties,
    //   columnDefs: [{field: 'id', displayName: $scope.labels.idLabel},
    //     {field: 'name', displayName: $scope.labels.nameLabel},
    //     {field: 'type', displayName: $scope.labels.typeLabel}]
    // };
    //
    // $scope.enumGridOptions = {
    //   data: 'selectedProperties[0].enumValues',
    //   enableRowReordering: true,
    //   headerRowHeight: 28,
    //   multiSelect: false,
    //   keepLastSelected: false,
    //   selectedItems: $scope.selectedEnumValues,
    //   columnDefs: [{field: 'id', displayName: $scope.labels.idLabel},
    //     {field: 'name', displayName: $scope.labels.nameLabel}]
    // }
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
  $scope.addNewProperty = function () {
    $scope.formProperties.push({
      id: 'new_property_' + propertyIndex++,
      name: '',
      type: 'string',
      readable: true,
      writable: true
    });

    $timeout(function () {
      $scope.gridOptions.selectItem($scope.formProperties.length - 1, true);
    });
  };

  // Click handler for remove button
  $scope.removeProperty = function () {
    if ($scope.selectedProperties.length > 0) {
      var index = $scope.formProperties.indexOf($scope.selectedProperties[0]);
      $scope.gridOptions.selectItem(index, false);
      $scope.formProperties.splice(index, 1);

      $scope.selectedProperties.length = 0;
      if (index < $scope.formProperties.length) {
        $scope.gridOptions.selectItem(index + 1, true);
      } else if ($scope.formProperties.length > 0) {
        $scope.gridOptions.selectItem(index - 1, true);
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
    console.log(1111);
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
    var saveProperties = []


    for (var i = 0; i < $scope.formProperties.length; i++) {
      var field = $scope.formProperties[i];
      saveProperties.push({
        id: field.name,
        name: field.value,
        type: field.type,
        readable: true,
        writable: true
      });
    }
    for (var i = 0; i < $scope.child11.length; i++) {
      var field = $scope.child11[i];
      saveProperties.push({
        id: field.name,
        name: field.value,
        type: field.type,
        readable: true,
        writable: true
      });

    }

    for (var i = 0; i < $scope.child22.length; i++) {
      var field = $scope.child22[i];
      saveProperties.push({
        id: field.name,
        name: field.value,
        type: field.type,
        readable: true,
        writable: true
      });
    }


    if (saveProperties.length > 0) {
      $scope.property.value = {};
      $scope.property.value.formProperties = saveProperties;
    } else {
      $scope.property.value = null;
    }

    $scope.updatePropertyInModel($scope.property);
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
