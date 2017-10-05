function RequestCtrl($scope, $stateParams, requestService, $timeout, $ionicLoading, $sce) {
  $scope.requestId = $stateParams.id;
  $scope.showAlert = function(title, template) {
    $scope.alertPopup = $ionicPopup.alert({
      title: title,
      template: template
    });
  };

  $ionicLoading.show({
    template: '{{ "Downloads" | translate }}...'
  });
  $timeout(function () {
    requestService.getBid($scope.requestId)
      .then(function(data) {
        if(data[0]) {
          var description = 'Зміст: ' + data[0].SubCategory;
          if (data[0].MessageText != "")
            description += ' (' + data[0].MessageText + ')';
          var date = moment(data[0].DateInsert).format("DD MM YYYY hh:mm:ss");
          $scope.request = {
            id: data[0].id,
            image: 'cover.png',
            title: data[0].Category,
            description: description,
            date: date
          };
        }
        else {
          $scope.request = {
            id: $scope.requestId,
            title: "Заявка не знайдена"
          };
        }
        $ionicLoading.hide();
      })
      .catch(function(err) {
        $scope.showAlert('{{ "Error" | translate }}', err.data);
        $ionicLoading.hide();
      })
  }, 1000);

}

angular.module('CityOnlineApp.controllers')
  .controller('RequestCtrl', RequestCtrl);