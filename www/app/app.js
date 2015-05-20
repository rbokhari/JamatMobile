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
        "BASE_ADDRESS": "http://localhost:91/" //"http://amc.azurewebsites.net/" 
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
    $ionicLoading.show({template: '<img src="/img/input-spinner.gif" alt="" />'});
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
          templateUrl:'app/templates/tajneed/tajneed-list.html'
        }
      }
    })

  .state('app.tajneed-head',{
      url:'/tajneed/head',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-head.html'
        }
      }
    })

  .state('app.tajneed-region',{
      url:'/tajneed/head/region',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-region.html'
        }
      }
    })

  .state('app.tajneed-auxilary',{
      url:'/tajneed/head/auxilary',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-auxilary.html'
        }
      }
    })

  .state('app.tajneed-nationality',{
      url:'/tajneed/head/nationality',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-nationality.html'
        }
      }
    })

  .state('app.tajneed-search',{
      url:'/tajneed/head/search',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-search.html'
        }
      }
    })

    .state('app.tajneed-list-auxilary',{
      url:'/tajneed/list/:auxilary',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-list.html'
        }
      }
    })

    .state('app.tajneed-list-nationality',{
      url:'/tajneed/list/:nationality',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-list.html'
        }
      }
    })
        
    .state('app.tajneed-list-region',{
      url:'/tajneed/list/:region',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-list.html'
        }
      }
    })

    .state('app.tajneed-list-mosi',{
      url:'/tajneed/list/:mosi',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-list.html'
        }
      }
    })

    .state('app.tajneed-list-search',{
      url:'/tajneed/list/',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-list.html'
        }
      }
    })
    
    .state('app.tajneed-detail',{
      url:'/tajneed/detail/:id',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-detail.html'
        }
      }
    })

    .state('app.tajneed-detail-general',{
      url:'/tajneed/detail-general/:id',
      views: {
        'mainContent':{
          templateUrl:'app/templates/tajneed/tajneed-detail-general.html'
        }
      }
    });

    $urlRouterProvider.otherwise('/login');

});

