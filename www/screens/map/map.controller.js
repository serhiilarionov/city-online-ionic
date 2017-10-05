function MapCtrl($scope, $ionicLoading, uiGmapGoogleMapApi) {
  $scope.map = {
    center: {
      latitude: 45,
      longitude: -73
    },
    zoom: 18,
    control: {},
    options: {
      disableDefaultUI: true
    }
  };

  uiGmapGoogleMapApi.then(function(maps) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      //$scope.map.control.refresh({latitude: pos.coords.latitude, longitude: pos.coords.longitude});

    });
  });
}

angular.module('CityOnlineApp.controllers')
  .controller('MapCtrl', MapCtrl);