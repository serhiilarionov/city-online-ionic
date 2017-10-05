angular.module('CityOnlineApp.services')
  .service('requestListService', function($http, $q, serverURL) {

    this.requestList = function(){
      var deferred = $q.defer();
      $http.get(serverURL + '/bids')
        .then(function(res){
          deferred.resolve(res);
        })
        .catch(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    }

  });