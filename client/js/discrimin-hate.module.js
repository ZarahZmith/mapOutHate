(function() {
  'use strict';

  angular.module('discriminHATE', ['ui.router'])
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/');

    $stateProvider
      .state({
        name: 'home',
        url: '/',
        templateUrl: '/templates/home.template.html'
      });

  }
}());