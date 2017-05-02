(function() {
  'use strict';

  angular.module('mapOutHate', ['ui.router'])
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

    $urlRouterProvider.otherwise('404');

    $stateProvider
      .state({
        name: 'home',
        url: '/',
        templateUrl: '/templates/home.template.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl',
        loginRequired: false
      })
      .state({
        name: 'report-incident',
        url: '/report',
        templateUrl: '/templates/report-incident.template.html',
        controller: 'ReportController',
        controllerAs: 'reportCtrl',
        loginRequired: true
      })
      .state({
        name: 'view-reports',
        url: '/report/all',
        templateUrl: '/templates/view-reports.template.html',
        controller: 'ReportController',
        controllerAs: 'reportCtrl',
        loginRequired: false,
        params: {successMessage: null}
      })
      .state({
        name: 'more-information',
        url: '/info',
        templateUrl: '/templates/more-info.template.html',
        loginRequired: false
      })
      .state({
        name: 'know-your-rights',
        url: '/rights',
        templateUrl: '/templates/know-your-rights.template.html',
        loginRequired: false
      })
      .state({
        name: 'not-found',
        url: '/404',
        templateUrl: '/templates/not-found.template.html',
        loginRequired: false
      });

  }

  setupAuthCheck.$inject = ['$rootScope', '$state'];
  /**
   * Checks whether user is logged in or not
   * @param  {Object} $rootScope  Lives on the window and gives access to any '$scope'
   * @param  {Object} $state      Allows for a statechange
   * @return {void}
   */
  function setupAuthCheck($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function checkLoginStatus(eventObj, toState) {
      if ( toState.loginRequired && !localStorage.getItem('token') ) {
        eventObj.preventDefault();
        $state.go('home');
      }
    });
  }

}());
