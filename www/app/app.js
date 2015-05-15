// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var jamatApp = angular.module('jamatApp', ['ionic', 'ngResource', 'LocalStorageModule'])
      .constant("VALIDATIONS", {
        "AUXILARY": "1",
        "NATIONALITY": "2",
        "CHANDA_TYPE": "4",
        "COUNTRY": "5",
        "TAJNEED_TYPE": "6"
      })
      .constant("SERVICE", { 
        "BASE_ADDRESS": "http://amc.azurewebsites.net/" //http://localhost:91/"
      });



jamatApp.run(function($ionicPlatform, $rootScope, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'Loading ...'});
  });

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  });

})


jamatApp.config(function($stateProvider, $urlRouterProvider, $httpProvider){

  $httpProvider.interceptors.push('authInterceptorService');

  $stateProvider
    .state('app',{
      abstract:true,
      url:'/app',
          templateUrl:'app/templates/menu.html',
          controller:'AccountController'
    })

   .state('login', {
      url: '/login',
      templateUrl: 'app/templates/login.html',
      controller:'AccountController'
      
    })

    .state('app.dashboard',{
      url:'/dashboard',
      views: {
        'mainContent':{
          templateUrl:'app/templates/dashboard.html'
        }
      }
    })

    .state('app.tajneed',{
      url:'/tajneed/list',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed-list.html'
        }
      }
    })

    .state('app.tajneed-detail',{
      url:'/tajneed/detail/:id',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed-detail.html'
        }
      }
    })

    $urlRouterProvider.otherwise('/login');

});

