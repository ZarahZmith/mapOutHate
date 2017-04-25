(function() {
  'use strict';

  angular.module('discriminHATE')
    .controller('LoginController', LoginController);

  LoginController.$inject = [ '$state' ];

  function LoginController($state) {

    //used "window" here because facebook did not recognize "vm" (as it relates to the line "let vm = this;")
    window.getLoginStatus = function getLoginStatus() {

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          $state.go('report-incident');
          //TODO save the token; response.authResponse.accessToken
        } else {
          console.error('Unable to get token. User is not signed in.');
        }
      });

    };

  }
}());
