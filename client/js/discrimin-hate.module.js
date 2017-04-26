(function() {
  'use strict';

  angular.module('discriminHATE', ['ui.router'])
    .config(routerConfig)
    .run(setupAuthCheck);

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  /**
   * Configures the router
   * @param  {Object} $stateProvider     Allows for redirections to alternative templates in the app
   * @param  {Object} $urlRouterProvider Monitors location via url
   * @return {void}
   */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/');

    $stateProvider
      .state({
        name: 'home',
        url: '/',
        templateUrl: '/templates/home.template.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      })
      .state({
        name: 'report-incident',
        url: '/report',
        templateUrl: '/templates/report-incident.template.html',
        controller: 'ReportController',
        controllerAs: 'reportCtrl',
        loginRequired: true
      });

  }

  setupAuthCheck.$inject = ['$rootscope', '$state'];
  /**
   * Checks whether user is logged in or not
   * @param  {Object} $rootscope  Lives on the window and gives access to any '$scope'
   * @param  {Object} $state      Allows for a statechange
   * @return {void}
   */
  function setupAuthCheck($rootscope, $state) {
    $rootscope.$on('$stateChangeStart', function checkLoginStatus(eventObj, toState) {
      if ( toState.loginRequired && !localStorage.getItem('token') ) {
        eventObj.preventDefault();
        $state.go('home');
      }
    });
  }

}());
