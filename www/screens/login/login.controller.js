function LoginCtrl($scope, $timeout, $state, $ionicLoading, $ionicPopup, $ionicModal, localStorageService, Streets, Cities, loginService, $translate) {
  $scope.loginService = loginService;
  $scope.loginForm = {
    login: '',
    password: '',
    invalid: true
  };

  $scope.forgotForm = {
    email: '',
    invalid: true
  };
  $scope.showAlert = function(title, template) {
    $scope.alertPopup = $ionicPopup.alert({
      title: title,
      template: template
    });
  };


  $scope.registrForm = {
    userName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    surname: '',
    name: '',
    otch: '',
    telephone: '',
    building: '',
    flat: '',
    city: '',
    street: '',
    invalid: true
  };

  $scope.$watch('loginForm', function(newValue, oldValue) {
    $scope.loginForm.invalid = !newValue.login || !newValue.password;
  }, true);
  $scope.$watch('forgotForm', function(newValue, oldValue) {
    $scope.forgotForm.invalid = !newValue.email;
  }, true);

  $scope.$watch('registrForm', function(newValue, oldValue){
    $scope.registrForm.invalid = !newValue.userName  /*|| !newValue.email*/ || !newValue.password || !newValue.passwordRepeat
                         || !newValue.surname || !newValue.name || !newValue.otch || !newValue.telephone
                         || !newValue.building || !newValue.flat || !newValue.city || !newValue.street;
  }, true);

  $scope.cities = Cities.query();
  //$scope.streets = Streets.query();
  $scope.getStreets = function(cityId){
    $scope.streets = Streets.query({
      id: cityId
    });
  };

  $scope.signUp = function() {
    var title, template = '';
    loginService.registration($scope.registrForm)
      .then(function(res){
        if(res.status == 200) {
          $scope.closeModal();
          title = 'Успіх';
          template = res.data;
          $scope.showPopup(title, template);
          $state.go('login');
        }
      })
      .catch(function(err){
        if(err){
          title = 'Помилка';
          template = 'При реєстрації виникла помилка';
          $scope.showPopup(title, template);
        }
      });
  };

  $scope.showPopup = function(title, template){
    $ionicPopup.alert({
      title: title,
      template: template
    });
  };
  $scope.forgot = function() {
    var email = $scope.forgotForm.email;
    $scope.loginService.forgot(email)
      .then(function(res) {
        if(res.status == 200) {
          $scope.closeModalForgot();
          $state.go('forgot');
        }
      })
      .catch(function(err) {
        $scope.showAlert('{{ "Error" | translate }}', err.data);
      });
  };

  $scope.signIn = function () {
    $ionicLoading.show({
      template: '{{ "Downloads" | translate }}...'
    });
    $timeout(function () {
      var userLogin = $scope.loginForm.login;
      var userPassword = $scope.loginForm.password;
      $scope.loginService.login(userLogin, userPassword)
        .then(function(res) {
          if(res.status == 200) {
            localStorageService.token = res.data.payload.token;
            $state.go('dashboard');
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      $ionicLoading.hide();
    }, 1000);
  };

  $ionicModal.fromTemplateUrl('registration.tpl', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $ionicModal.fromTemplateUrl('forgot.tpl', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modaForgot = modal;
  });
  $scope.openModalForgot = function() {
    $scope.modaForgot.show();
  };
  $scope.closeModalForgot = function() {
    $scope.modaForgot.hide();
  };

  $scope.ChangeLanguage = function(lang){
    $translate.use(lang);
  }
}

angular.module('CityOnlineApp.controllers')
  .controller('LoginCtrl', LoginCtrl);