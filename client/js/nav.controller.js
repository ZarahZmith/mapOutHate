(function() {
  'use strict';

  angular.module('mapOutHate')
    .controller('NavController', NavController);

  function NavController() {
    let vm = this;

    vm.isLoggedIn = function isLoggedIn() {
      //TODO return whether or not there is a token saved
      //may require logout fn in a service
      //may require login fn in a service
    };
  }
}());
