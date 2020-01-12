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
 * Task listeners
 */

var KisBpmFieldsCtrl = ['$scope', '$modal', '$timeout', '$translate', function ($scope, $modal, $timeout, $translate) {

  // Config for the modal window
  var opts = {
    template: 'editor-app/configuration/properties/fields-popup.html',
    scope: $scope
  };

  // Open the dialog
  $modal(opts);
}];

var KisBpmFieldsPopupCtrl = ['$scope', '$q', '$translate', '$http', function ($scope, $q, $translate, $http) {

  // Put json representing form properties on scope
  $scope.selectShapeName = $scope.selectedShape.properties['oryx-name']
  $scope.selectServiceType = $scope.selectedShape.properties['oryx-servicetasktype']
  if ($scope.property.value !== undefined && $scope.property.value !== null
    && $scope.property.value.fields !== undefined
    && $scope.property.value.fields !== null) {
    // Note that we clone the json object rather then setting it directly,
    // this to cope with the fact that the user can click the cancel button and no changes should have happened
    $scope.fields = angular.copy($scope.property.value.fields);
    // var child1 = [];
    // var child2 = [];
    // console.log($scope.property)
    //
    // for (var i = 0; i < $scope.fields.length; i++) {
    //   var field = $scope.fields[i];
    //   if (field.name === 'max_judgments_per_unit' || field.name === 'min_unit_confidence' || field.name === 'confidence_fields' || field.name === 'expected_judgments_per_unit') {
    //     child1.push(field);
    //     $scope.fields.splice(i, 1);
    //   }
    //   if (field.name === 'auto_order_timeout' || field.name === 'auto_order_threshold') {
    //     child2.push(field);
    //     $scope.fields.splice(i, 1);
    //   }
    //   if (field.stringValue !== undefined && field.stringValue !== '') {
    //     field.implementation = field.stringValue;
    //   }
    //   else if (field.expression !== undefined && field.expression !== '') {
    //     field.implementation = field.expression;
    //   }
    //   else if (field.string !== undefined && field.string !== '') {
    //     field.implementation = field.string;
    //   }
    //
    // }
    // $scope.child11 = child1;
    // $scope.child22 = child2;

  } else {
    $scope.fields = [];
  }

  // Array to contain selected properties (yes - we only can select one, but ng-grid isn't smart enough)
  $scope.selectedFields = [];
  $scope.translationsRetrieved = false;
  $scope.labels = {};
  var namePromise = $translate('PROPERTY.FIELDS.NAME');
  var implementationPromise = $translate('PROPERTY.FIELDS.IMPLEMENTATION');

  $q.all([namePromise, implementationPromise]).then(function (results) {
    $scope.labels.nameLabel = results[0];
    $scope.labels.implementationLabel = results[1];
    $scope.translationsRetrieved = true;

    // Config for grid
    $scope.gridOptions = {
      data: 'fields',
      enableRowReordering: true,
      headerRowHeight: 28,
      multiSelect: false,
      keepLastSelected: false,
      selectedItems: $scope.selectedFields,
      columnDefs: [{field: 'name', displayName: $scope.labels.nameLabel},
        {field: 'implementation', displayName: $scope.labels.implementationLabel}]
    };
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

  // var dataUrl = KISBPM.URL.getModel(modelId);
  if($scope.selectShapeName === 'LoadData'){
    $scope.selectedMeta = [];
    $scope.selectedAnswerData = [];
    $scope.dataSetType = 'CrowdData'
    $http({method: 'GET', url: KISBPM.URL.getMetaList()}).success(function (data, status, headers, config) {

      $scope.metaData = data.data.rows
      // console.log($scope.metaData );

      for (var i = 0; i < $scope.metaData.length; i++) {
        $scope.metaData[i].createTime = parseTime($scope.metaData[i].createTime, '{y}-{m}-{d} {h}:{i}')
      }
      $scope.dataBase = {
        data: 'metaData',
        headerRowHeight: 28,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        enableHorizontalScrollbar: 0,
        enableColumnMenus: false,
        enableSorting: false,
        selectedItems: $scope.selectedMeta,
        columnDefs: [{field: 'metaName', displayName: 'MetaName'},
          {field: 'type', displayName: 'Type'},
          {field: 'createTime', displayName: 'CreateTime'}]
      };
      $scope.$watch('selectedMeta', function () {
        if($scope.selectedMeta.length > 0){
          $scope.selectedFields[0].implementation= $scope.selectedMeta[0].metaName
          $scope.selectedFields[0].stringValue= $scope.selectedMeta[0].metaName
        }

      },true);

    }).error(function (data, status, headers, config) {
      console.log('Error loading metaData');
    });

    $scope.$watch("dataSetType", function (n, o) {
      // console.log($scope.gridOptions)
      if(n!=o){
        $scope.selectedFields[0].implementation= $scope.dataSetType
        $scope.selectedFields[0].stringValue= $scope.dataSetType
      }
    });

    $http({method: 'GET', url: KISBPM.URL.getAnswerDataList()}).success(function (data, status, headers, config) {

      $scope.answerData = data.data.rows
      console.log($scope.answerData );

      for (var i = 0; i < $scope.answerData.length; i++) {
        $scope.answerData[i].createTime = parseTime($scope.answerData[i].createTime, '{y}-{m}-{d} {h}:{i}')
      }
      $scope.answerDataBase = {
        data: 'answerData',
        headerRowHeight: 28,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        enableHorizontalScrollbar: 0,
        enableColumnMenus: false,
        enableSorting: false,
        selectedItems: $scope.selectedAnswerData,
        columnDefs: [
          {field: 'id', displayName: 'ID'},
          {field: 'name', displayName: 'Name'},
          {field: 'hasGold', displayName: 'HasGold'},
          {field: 'createTime', displayName: 'CreateTime'}]
      };
      $scope.$watch('selectedAnswerData', function () {
        if($scope.selectedAnswerData.length > 0){
          $scope.selectedFields[0].implementation= $scope.selectedAnswerData[0].id
          $scope.selectedFields[0].stringValue= $scope.selectedAnswerData[0].id
        }
      },true);
    }).error(function (data, status, headers, config) {
      console.log('Error loading answerData');
    });
  }
  $scope.fileChanged = function (ele) {
    $scope.files = ele.files;
    var filename = $scope.files[0].name;
    //console.log($scope.selectedProperties[0].variable);
    $scope.selectedFields[0].implementation = filename;
    $scope.$apply();
  }

  $scope.fieldNameChanged = function () {
    $scope.selectedFields[0].implementation = $scope.selectedFields[0].string;
  };

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

    if ($scope.fields.length > 0) {
      $scope.property.value = {};
      $scope.property.value.fields = $scope.fields;
      $scope.property.value.testfields = $scope.fields;
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
