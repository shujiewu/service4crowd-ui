




var KisBpmServiceSelectionCtrl = [ '$rootScope', '$scope', '$http', '$timeout', '$translate', function($rootScope, $scope,$http, $timeout, $translate) {
    // Config for grid
    $scope.availableService = [];
    $scope.selecteService = [];
    $http.get(KISBPM.URL.getRegisterService())
        .success(function (response) {
            var Service = [];
            for (var i = 0; i < response.length; i++)
            {
                var id = response[i].id;
                if(id=="SPRING-CLOUD-CONSUMER")
                {
                    continue;
                }
                var ss = {'id': response[i].id, 'host': response[i].host,'version':1};
                Service.push(ss);
            }
            $scope.availableService=Service;
        });
    $scope.gridOptions = {
        data: 'availableService',
        enableRowReordering: true,
        headerRowHeight: 28,
        multiSelect: false,
        keepLastSelected : false,
        selectedItems: $scope.selecteService,
        columnDefs: [{ field: 'id', displayName: 'ID'},
            { field: 'host', displayName: 'Url'},
            { field: 'version', displayName: 'Version'}]
    }



    $scope.cancel = function() {

        $scope.$hide();
    };

    // Close button handler
    $scope.close = function() {
        $scope.$hide();
    };
    $scope.select = function() {
        if ($scope.selecteService.length > 0) {
            $http.get(KISBPM.URL.getServiceProperty($scope.selecteService[0].id))
                .success(function (response) {
                    var id=$rootScope.selectedItem.properties[0];
                    id.value= $scope.selecteService[0].id;
                    $rootScope.updatePropertyInModel(id);

                    var property=$rootScope.selectedItem.properties[1];
                    console.log($rootScope.selectedItem.properties[3]);
                    property.value=$scope.selecteService[0].id;
                    console.log(response);
                    var length=response.length;
                    for(var i=0;i<$rootScope.selectedItem.properties.length;i++)
                    {
                        if($rootScope.selectedItem.properties[i].key==='oryx-formproperties')
                        {
                            var propertyList=$rootScope.selectedItem.properties[i];
                            //console.log(propertyList);
                            var formProperties=[];
                            for(var i=0;i<length;i++)
                            {
                                if(response[i].type==='Text')
                                {
                                    var property=$rootScope.selectedItem.properties[2];
                                    var currentProperty = {
                                        'key': i,
                                        'title': response[i].name,
                                        'type': property.type,
                                        'mode': 'read',
                                        'hidden': false,
                                        'value': '',
                                        'hasReadWriteMode':property.hasReadWriteMode,
                                        'writeModeTemplateUrl':property.writeModeTemplateUrl,
                                        'readModeTemplateUrl':property.readModeTemplateUrl,
                                        'noValue':true
                                    };

                                    $rootScope.selectedItem.properties.push(
                                        currentProperty
                                    );
                              //      $rootScope.selectedShape.getStencil().addProperty(currentProperty, $rootScope.selectedShape.getStencil().namespace());
                                   // $rootScope.selectedShape.properties[response[i].name]='';

                              //      console.log( $rootScope.selectedShape);
                                    continue;
                                }
                                formProperties.push({ id : response[i].name,
                                    name : "",
                                    type : response[i].type,
                                    readable: true,
                                    writable: true});
                            }
                            if (propertyList.value !== undefined && propertyList.value !== null
                                && propertyList.value.formProperties !== undefined
                                && propertyList.value.formProperties !== null)
                            {
                                propertyList.value.formProperties.clear();
                                propertyList.value.formProperties =formProperties;
                            }
                            else
                            {
                                propertyList.value = {};
                                propertyList.value.formProperties =formProperties;
                            }
                            $rootScope.updatePropertyInModel(propertyList);
                            break;
                        }
                    }

                    $rootScope.updatePropertyInModel(property);

                });
        }
        $scope.$hide();
    };
}];