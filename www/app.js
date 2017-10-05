// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('CityOnlineApp',
  [
    'ionic',
    'uiGmapgoogle-maps',
    'CityOnlineApp.controllers',
    'CityOnlineApp.services',
    'CityOnlineApp.data-sources',
    'CityOnlineApp.hardware',
    'ngResource',
    'pascalprecht.translate',
    'LocalStorageModule'
  ])

  .run(function ($ionicPlatform, $rootScope, $ionicLoading, $timeout, $translate) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
      $rootScope.$on('alert:show', function(event, args) {
        $ionicLoading.show({
          template: args
        });
        $timeout(function () {
          $rootScope.$broadcast('alert:hide');
        }, 2000);
      });

      $rootScope.$on('alert:hide', function() {
        $ionicLoading.hide()
      });
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, $httpProvider, $translateProvider) {

    for(lang in TRANSLATIONS){
      $translateProvider.translations(lang, TRANSLATIONS[lang]);
    }
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.preferredLanguage('en');

    $httpProvider.interceptors.push(function($rootScope) {
      var language = "";
      return {
      responseError: function(response) {
        language = $translateProvider.use();

        if(response.data && response.data.hasOwnProperty('status_code') && response.data.hasOwnProperty('message')) {
            if(TRANSLATIONS[language][response.data.message]){
              response.data.message = TRANSLATIONS[language][response.data.message];
            }
            $rootScope.$broadcast('alert:show', response.data.message);
          }
          return response;
        },
        response: function(response) {
          language = $translateProvider.use();

          if(response.data && response.data.hasOwnProperty('status_code') && response.data.hasOwnProperty('message')) {
            if(TRANSLATIONS[language][response.data.message]){
              response.data.message = TRANSLATIONS[language][response.data.message];
            }
            $rootScope.$broadcast('alert:show', response.data.message);
          }
          return response;
        }
      };
    });

    $httpProvider.interceptors.push(['$q', '$location', 'localStorageService', function($q, $location, localStorageService){
      return {
        'request': function(config){
          config.headers = config.headers || {};
          if(localStorageService.token){
            config.headers.Authorization = localStorageService.token;
          }
          return config;
        },

        'responseError': function(response){
          if(response.status == 401 || response.status == 403){
            $location.path('/login');
          }
          return $q.reject(response);
        }
      }
    }]);

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyA8l__QIyOUxOBkqWw4I0frTuC08IW50tQ',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('login', {
        url: '/login',
        views: {
          dashboard: {
            templateUrl: 'screens/login/login.tpl.html',
            controller: 'LoginCtrl'
          }
        }
      })

      .state('dashboard', {
        url: '/dashboard',
        views: {
          dashboard: {
            templateUrl: 'screens/dashboard/dashboard.tpl.html',
            controller: 'DashboardCtrl'
          }
        }
      })

      .state('requestList', {
        url: '/request-list',
        views: {
          dashboard: {
            templateUrl: 'screens/requestList/requestList.tpl.html',
            controller: 'RequestListCtrl'
          }
        }
      })

      .state('request', {
        url: '/request/:id',
        views: {
          dashboard: {
            templateUrl: 'screens/request/request.tpl.html',
            controller: 'RequestCtrl'
          }
        }
      })

      .state('settings', {
        url: '/settings',
        views: {
          dashboard: {
            templateUrl: 'screens/settings/settings.tpl.html',
            controller: 'SettingsCtrl'
          }
        }
      })

      .state('info', {
        url: '/info',
        views: {
          dashboard: {
            templateUrl: 'screens/info/info.tpl.html',
            controller: 'InfoCtrl'
          }
        }
      })

      .state('map', {
        url: '/map',
        views: {
          dashboard: {
            templateUrl: 'screens/map/map.tpl.html',
            controller: 'MapCtrl'
          }
        }
      })

      .state('forgot', {
        url: '/forgot',
        views: {
          dashboard: {
            templateUrl: 'screens/forgot/forgot.tpl.html',
            controller: 'ForgotCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });

angular.module('CityOnlineApp.controllers', []);
angular.module('CityOnlineApp.services', ['ngResource']).constant('serverURL', 'http://localhost:3000');
angular.module('CityOnlineApp.data-sources', ['ngResource']);
angular.module('CityOnlineApp.hardware', []);