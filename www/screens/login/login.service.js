angular.module('CityOnlineApp.services')
  .service('loginService', function ($http, $q, serverURL, localStorageService) {
    this.login = function (userLogin, userPassword) {
      var deferred = $q.defer();
      $http.post(serverURL + '/login', {"userLogin":userLogin,"userPassword":userPassword})
        .then(function(res){
          localStorageService.user = res.data.payload.user;
          deferred.resolve(res);
        })
        .catch(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    };

    this.forgot = function (email) {
      var deferred = $q.defer();
      $http.post(serverURL + '/forgot', {"userEmail":email})
        .then(function(res){
          deferred.resolve(res);
        })
        .catch(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    };

    this.registration = function(registrForm) {
      var deferred = $q.defer();
      $http.post(serverURL + '/adduser', {
        "userLogin":registrForm.userName,
        "userEmail":registrForm.email,
        "userPassword":registrForm.password,
        "rePass":registrForm.passwordRepeat,
        "surname":registrForm.surname,
        "name":registrForm.name,
        "otch":registrForm.otch,
        "tel":registrForm.tel,
        "city":registrForm.city,
        "street":registrForm.street,
        "house":registrForm.building,
        "flat":registrForm.flat
      })
        .then(function(res){
          deferred.resolve(res);
        })
        .catch(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    }
  });