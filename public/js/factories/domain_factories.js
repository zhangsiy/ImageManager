var domainFactories = angular.module('domainFactories', ['ngResource']);

domainFactories.factory('UploadRecordRepository', ['$resource',
  function($resource){
    return {
      ById: $resource('/api/uploads/:id', {id:'@id'})
    };
  }
]);