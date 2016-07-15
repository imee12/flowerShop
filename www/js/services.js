angular.module('app.services', [])


.factory('Auth', function($firebaseAuth, Root, $timeout){
  var auth = $firebaseAuth(Root);


  return {

    // helper method to login with multiple providers
    loginWithProvider: function loginWithProvider(provider) {
      return auth.$authWithOAuthPopup(provider);
    },
    // convenience method for logging in with Facebook
    loginWithFacebook: function login() {
      return this.loginWithProvider("facebook");
    },
    // wrapping the unauth function
    logout: function logout() {
      auth.$unauth();
    },
    // wrap the $onAuth function with $timeout so it processes
    // in the digest loop.
    onAuth: function onLoggedIn(callback) {
      auth.$onAuth(function(authData) {
        $timeout(function() {
          callback(authData);
        });
      });
    }
  };
})

.factory('dataService', ['$firebase','$q', '$firebaseArray', '$firebaseObject', function($firebase,$q, $firebaseArray, $firebaseObject){

    var firebaseRef= new Firebase("https://flowershop.firebaseio.com");

    var getFirebaseRoot = function(){
          return firebaseRef;
    };


    // var getHoursNode = function(key){
    //           var path = "Hours/";
    //           if (key) {
    //             path = path + key;
    //           }
    //           return getFirebaseRoot().child(path);
    //       }

    var addData = function(data){
console.log("updating?");
        return  firebaseRef.update(data)
        };

    var getData = function(callback){
       return firebaseRef.$asArray();
      };


    var service = {
          addData : addData,
          getData: getData

        };

        return service;

    }])
