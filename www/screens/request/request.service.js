angular.module('CityOnlineApp.services')
  .service('requestService', function ($q, serverURL, Post) {
    this.getBid = function (id) {
      var deferred = $q.defer();
      Post.query({ id: id }, function(data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    };
  });