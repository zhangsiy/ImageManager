// public/core.js
var bmLogging = angular.module('bmLogging', ['ui.bootstrap']);

bmLogging.controller('mainController',
  ['$scope', '$http', '$modal',
  function mainController($scope, $http, $modal) {

        var getAllLogs = function() {
            $http.get('/api/bm_log')
            .success(function(data) {
                $scope.bmLogs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        };

        // when landing on the page, get all current logs and show them
        getAllLogs();

        $scope.showCreateLogDialog = function() {
            var modalInstance = $modal.open({
                templateUrl: '/partials/modal_add_log.html',
                controller: 'modalAddLogController',
                size: 'lg',
                backdrop: 'static',
            });

            modalInstance.result.then(function(bmLogs){
                $scope.bmLogs = bmLogs;
            });
        };

        $scope.clearAllLogs = function() {
            $http.delete('/api/bm_log/clear_all')
                .success(function(data) {
                    $scope.bmLogs = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.refreshAllLogs = function() {
            getAllLogs();
        };
    }]);

bmLogging.controller('modalAddLogController',
  ['$scope', '$http', '$modalInstance',
    function modalAddLogController($scope, $http, $modalInstance) {
        $scope.cancel = function() {
            $modalInstance.dismiss();
        };
        $scope.save = function(logToSave) {
            $http.post('/api/bm_log', logToSave)
                .success(function(data) {
                    $modalInstance.close(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
    }]);