angular.module('CityOnlineApp.services')
  .service('dashboardService', function ($http, $q, serverURL) {
    this.logout = function () {
      var deferred = $q.defer();
      $http.get(serverURL + '/logout')
        .then(function(res){
          deferred.resolve(res);
        })
        .catch(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    };
    this.BidAdd = function (newBid) {
      var deferred = $q.defer();

      $http.post(serverURL + '/bid/add', {
          "bidImage": newBid.bidImage,
          "surname": newBid.surname,
          "name": newBid.name,
          "patronimik": newBid.patronimik,
          "userEmail": newBid.userEmail,
          "street": newBid.street,
          "house": newBid.house,
          "flat": newBid.flat,
          "bid_street": newBid.bid_street,
          "bid_house": newBid.bid_house,
          "bid_flat": newBid.bid_flat,
          "categories": newBid.categories,
          "subcategories": newBid.subcategories,
          "lat": newBid.lat,
          "lng": newBid.lng,
          "isBidOnUserAddress": newBid.isBidOnUserAddress
        })
        .then(function(res){
          deferred.resolve(res);
        })
        .catch(function(err){
          deferred.reject(err);
        });
      return deferred.promise;
    };
  });