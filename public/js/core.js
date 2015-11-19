// public/core.js
var imageManager = angular.module('imageManager', [
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angularFileUpload'
]);

imageManager.controller('mainController',
  ['$scope', '$http', '$modal',
  function mainController($scope, $http, $modal) {

        var getAllUploads = function() {
            $http.get('/api/uploads')
            .success(function(data) {
                $scope.uploads = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        };

        // when landing on the page, get all current logs and show them
        getAllUploads();

        $scope.showCreateUploadDialog = function() {
            var modalInstance = $modal.open({
                templateUrl: '/partials/modal_add_upload.html',
                controller: 'modalAddUploadController',
                size: 'lg',
                backdrop: 'static',
            });

            modalInstance.result.then(function(uploads){
                $scope.uploads = uploads;
            });
        };

        $scope.clearAllUploads = function() {
            $http.delete('/api/uploads/clear_all')
                .success(function(data) {
                    $scope.uploads = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.refreshAllUploads = function() {
            getAllUploads();
        };
    }]);

imageManager.controller('modalAddUploadController',
  ['$scope', '$http', '$modalInstance',
    function modalAddUploadController($scope, $http, $modalInstance) {
        $scope.cancel = function() {
            $modalInstance.dismiss();
        };
        $scope.save = function(uploadToSave) {
            $http.post('/api/uploads', uploadToSave)
                .success(function(data) {
                    $modalInstance.close(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
    }]);