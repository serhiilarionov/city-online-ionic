function ForgotCtrl($scope, $state, $ionicPopup, forgotService, $translate) {
    $scope.forgotService = forgotService;
    $scope.forgotForm = {
      hash: '',
      password: '',
      passwordConfirm: '',
      invalid: true
    };
    $scope.showAlert = function(title, template) {
      $scope.alertPopup = $ionicPopup.alert({
        title: title,
        template: template
      });
    };

    $scope.$watch('forgotForm', function(newValue, oldValue) {
      $scope.forgotForm.invalid = !newValue.hash || !newValue.password || !newValue.passwordConfirm || newValue.password != newValue.passwordConfirm;
    }, true);
    $scope.forgot = function() {
      var recoverHash = $scope.forgotForm.hash;
      var password = $scope.forgotForm.password;
      var rePass = $scope.forgotForm.passwordConfirm;

      $scope.forgotService.forgot(recoverHash, password, rePass)
        .then(function(res) {
          if(res.status == 200) {
            $state.go('login');
          }
        })
        .catch(function(err) {
          $scope.showAlert('{{ "Error" | translate }}', err.data);
        });
    };

    $scope.ChangeLanguage = function(lang){
      $translate.use(lang);
    }
}

angular.module('CityOnlineApp.controllers')
  .controller('ForgotCtrl', ForgotCtrl);