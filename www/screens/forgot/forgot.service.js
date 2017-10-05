angular.module('CityOnlineApp.services')
  .service('forgotService', function ($http, $q, serverURL) {
    this.forgot = function (hash, password, passwordConfirm) {
      var deferred = $q.defer();
      $http.post(serverURL + '/forgot/'+hash, {'userPassword':password, 'rePass': passwordConfirm, 'hash':hash})
        .then(function(res){
          deferred.resolve(res);
        })
        .catch(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    };
  });