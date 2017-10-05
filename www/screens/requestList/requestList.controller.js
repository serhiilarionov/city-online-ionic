function RequestListCtrl($scope, $state, $ionicPopup, requestListService) {
  $scope.requestListService = requestListService;

  $scope.requests = {
    ID: null,
    Fullname:'',
    Category: '',
    Message:'',
    Status:''
  };
  /*$scope.requests = [
    {
      id: 1,
      image: 'cover.png',
      title: 'Нова заявкка',
      description: 'Короткий опис змісту заявки'
    },
    {
      id: 2,
      image: 'cover.png',
      title: 'Нова заявкка',
      description: 'Короткий опис змісту заявки'
    },
    {
      id: 3,
      image: 'cover.png',
      title: 'Нова заявкка',
      description: 'Короткий опис змісту заявки'
    },
    {
      id: 4,
      image: 'cover.png',
      title: 'Нова заявкка',
      description: 'Короткий опис змісту заявки'
    }
  ];*/

  $scope.showAlert = function(title, template) {
    $scope.alertPopup = $ionicPopup.alert({
      title: title,
      template: template
    });
    $scope.alertPopup.then(function(res) {
      $state.go('login');
    });
  };


    requestListService.requestList()
      .then(function(res){
        $scope.requests = res.data;
      })
      .catch(function(err){
        $scope.showAlert('Помилка', err.data);
      });


  $scope.searchString = '';
  $scope.resetSearch = function() {
    $scope.searchString = '';
  };
  $scope.doRefresh = function() {
    $scope.requests.unshift({
      id: 4,
      image: 'cover.png',
      title: 'Нова заявкка',
      description: 'Короткий опис змісту заявки'
    });
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  };
}

angular.module('CityOnlineApp.controllers')
  .controller('RequestListCtrl', RequestListCtrl);