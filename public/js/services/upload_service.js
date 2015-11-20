var imServices = angular.module('imServices');

imServices.factory('UploadService',
  ['$upload',
   '$q',
   'UploadRecordRepository',
   function($upload,
            $q,
            UploadRecordRepository){

   	var getAllUploadRecords = function() {
   		var deferred = $q.defer();

   		UploadRecordRepository.ById.query()
   		.$promise.then(
   			function(uploadRecords) {
   				deferred.resolve(uploadRecords);
   			},
   			function(errors) {
   				deferred.reject(errors);
   			}
   		);

   		return deferred.promise;
   	};

   	var createUploadRecord = function(uploadRecordToSave) {
   		var deferred = $q.defer();

   		UploadRecordRepository.ById.save(uploadRecordToSave)
   		.$promise.then(
   			function(uploadRecords) {
   				deferred.resolve(uploadRecords);
   			},
   			function(errors) {
   				deferred.reject(errors);
   			}
   		);

   		return deferred.promise;
   	};

   	var deleteUploadRecord = function(recordId) {
   		var deferred = $q.defer();

   		UploadRecordRepository.ById.delete({id : recordId})
   		.$promise.then(
   			function(uploadRecords) {
   				deferred.resolve(uploadRecords);
   			},
   			function(errors) {
   				deferred.reject(errors);
   			}
   		);

   		return deferred.promise;
   	};

    return{
    	getAllUploadRecords : getAllUploadRecords,
        createUploadRecord : createUploadRecord,
        deleteUploadRecord : deleteUploadRecord
    };
   }
]);