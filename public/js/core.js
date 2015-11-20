// public/core.js
var imageManager = angular.module('imageManager', [
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angularFileUpload',
    'domainFactories',
    'imServices'
]);

imageManager.controller('mainController',
  ['$scope', '$http', '$modal', 'UploadService',
  function mainController($scope, $http, $modal, UploadService) {

        var getAllUploads = function() {
            UploadService.getAllUploadRecords().then(
                function(data) {
                    $scope.uploads = data;
                    console.log(data);
                },
                function(data) {
                    console.log('Error: ' + data);
                }
            );
        };

        // when landing on the page, get all current logs and show them
        getAllUploads();

        $scope.showUploadDialog = function() {
            var modalInstance = $modal.open({
                templateUrl: '/partials/modal_upload.html',
                controller: 'modalUploadController',
                size: 'lg',
                backdrop: 'static',
            });

            modalInstance.result.then(function(uploads){
                $scope.uploads = uploads;
            });
        };

        $scope.showCreateUploadDialog = function() {
            var modalInstance = $modal.open({
                templateUrl: '/partials/modal_add_upload.html',
                controller: 'modalAddUploadController',
                size: 'lg',
                backdrop: 'static',
            });

            modalInstance.result.then(function(uploads){
                getAllUploads();
            });
        };

        $scope.deleteUpload = function(id) {
            UploadService.deleteUploadRecord(id).then(
                function(data) {
                    getAllUploads();
                    console.log(data);
                },
                function(data) {
                    console.log('Error: ' + data);
                }
            );
        };

        $scope.refreshAllUploads = function() {
            getAllUploads();
        };
    }]);

imageManager.controller('modalAddUploadController',
  ['$scope', '$http', '$modalInstance', 'UploadService',
    function modalAddUploadController($scope, $http, $modalInstance, UploadService) {
        $scope.cancel = function() {
            $modalInstance.dismiss();
        };
        $scope.save = function(uploadToSave) {
            UploadService.createUploadRecord(uploadToSave).then(
                function(data) {
                    $modalInstance.close(data);
                },
                function(data) {
                    console.log('Error: ' + data);
                }
            );
        };
    }]);

imageManager.controller('modalUploadController',
  ['$scope', '$http', '$modalInstance',
    function modalUploadController($scope, $http, $modalInstance) {
        $scope.cancel = function() {
            $modalInstance.dismiss();
        };
        $scope.upload = function(uploadToSave) {
            $http.post('/api/uploads', uploadToSave)
                .success(function(data) {
                    $modalInstance.close(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
    }]);