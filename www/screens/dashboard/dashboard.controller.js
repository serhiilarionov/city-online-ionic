function DashboardCtrl($scope, $state, $ionicModal, $ionicPopup, $ionicActionSheet, uiGmapGoogleMapApi, Streets, Cities, RequestCategories, Camera, dashboardService, localStorageService) {
  $scope.dashboardService = dashboardService;
  $scope.cities = Cities.query();
  $scope.streets = Streets.query({id: localStorageService.user.cityID});
  $scope.requestCategories = RequestCategories.get();
  $scope.newRequest = {
    requestPhoto: '',
    street: '',
    building: '',
    flat: '',
    bid_street: '',
    bid_building: '',
    bid_flat: '',
    category: '',
    subcategory: '',
    description: ''
  };
  $scope.marker = null;

  $ionicModal.fromTemplateUrl('new-request.tpl', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openNewRequestModal = function() {
    $scope.modal.show();
  };

  $scope.closeNewRequestModal = function() {
    $scope.newRequest = {
      requestPhoto: '',
      street: '',
      building: '',
      flat: '',
      category: '',
      subcategory: '',
      description: ''
    };
    if($scope.marker) {
      $scope.marker.setMap(null);
    }
    $scope.modal.hide();
  };

  $scope.sendRequest = function() {
    var newBid = [];
    newBid.bidImage = $scope.newRequest.requestPhoto;
    newBid.bid_street = $scope.newRequest.street;
    newBid.house = $scope.newRequest.building;
    newBid.flat= $scope.newRequest.flat;

    newBid.bid_street = $scope.newRequest.bid_street;
    newBid.bid_house = $scope.newRequest.bid_building;
    newBid.bid_flat= $scope.newRequest.bid_flat;
    newBid.categories = $scope.newRequest.category.id;
    newBid.subcategories = $scope.newRequest.subcategory;
    newBid.lat = "";
    newBid.lng = "";
    newBid.isBidOnUserAddress = $scope.map.useGPS;
    if(!newBid.isBidOnUserAddress) {
      newBid.street = $scope.newRequest.street;
      newBid.house = $scope.newRequest.building;
      newBid.flat= $scope.newRequest.flat;
    }
    newBid.bidMessage = $scope.newRequest.description;
    $scope.dashboardService.BidAdd(newBid)
      .then(function(res) {
        if(res.status == 200) {
          $scope.modal.hide();
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  $scope.showAlert = function(title, template) {
    $scope.alertPopup = $ionicPopup.alert({
      title: title,
      template: template
    });
    $scope.alertPopup.then(function(res) {
      $state.go('login');
    });
  };
  $scope.showPhotoSourcePopup = function() {
    var photoSourcePopup = $ionicPopup.show({
      template: 'Оберіть звідки взяти фото',
      title: 'Фото до заявки',
      scope: $scope,
      buttons: [
        {
          text: 'Камера',
          type: 'button-positive',
          onTap: function(event) {
            return $scope.takePhoto();
          }
        },
        {
          text: 'Галерея',
          type: 'button-positive'
        }
      ]
    });

    photoSourcePopup.then(function(res) {
      console.log(res);
    })
  };

  $scope.takePhoto = function () {
    Camera.getPicture()
      .then(function(imageURI) {
        $scope.newRequest.requestPhoto = imageURI;
      })
      .catch(function(err) {
        console.error(err);
      })
  };

  $scope.logout = function() {
    $ionicActionSheet.show({
      destructiveText: 'Вийти',
      titleText: 'Вихід з аккаунту',
      cancelText: 'Відмінити',
      destructiveButtonClicked: function() {
        $scope.dashboardService.logout()
          .then(function(res) {
            if(res.status == 200) {
              $state.go('login');
            }
          })
          .catch(function(err) {
            $scope.showAlert('Помилка', err);
          });
      },
      buttonClicked: function(index) {
        alert(index);
        return true;
      }
    });
  };

  //  Map for new request
  $scope.map = {
    center: {
      latitude: 45,
      longitude: -73
    },
    zoom: 18,
    draggable: true,
    control: {},
    options: {
      disableDefaultUI: true
    },
    useGPS: true
  };

  $scope.goToAddress = function() {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': 'Кривий Ріг ' + $scope.newRequest.street + ' ' + $scope.newRequest.building
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $scope.gmaps.setCenter(results[0].geometry.location);
        if($scope.marker) {
          $scope.marker.setMap(null);
        }
        $scope.marker = new google.maps.Marker({
          map: $scope.gmaps,
          position: results[0].geometry.location,
          draggable: true,
          title: 'Кривий Ріг ' + $scope.newRequest.street + ' ' + $scope.newRequest.building
        });
      } else {
        if($scope.marker) {
          $scope.marker.setMap(null);
        }
      }
    });
  };

  $scope.toggleGpsUsing = function() {
    if($scope.map.useGPS) {
      $scope.map.draggable = false;
      navigator.geolocation.getCurrentPosition(function (pos) {
        $scope.map.control.refresh({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
      });
    } else {
      $scope.map.draggable = true;
    }
  };

  uiGmapGoogleMapApi.then(function(mapsApi) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      $scope.map.control.refresh({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
      $scope.gmaps = $scope.map.control.getGMap();
      $scope.marker = new google.maps.Marker({
        map: $scope.gmaps,
        position: pos.coords,
        draggable: true,
        title: 'Кривий Ріг ' + $scope.newRequest.street + ' ' + $scope.newRequest.building
      });
    });
  });
}

angular.module('CityOnlineApp.controllers')
  .controller('DashboardCtrl', DashboardCtrl);