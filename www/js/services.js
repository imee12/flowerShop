//var ACCESS-TOKEN = "3549482147.acf87e4.3cf07755b49448db889bf0120b4af5d7";


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
  //  var meterRef = new Firebase(firebaseRef + "/Locations/" +
    var customerRef = new Firebase(firebaseRef + "/Customers/");

    var getFirebaseRoot = function(){
          return firebaseRef;
    };

    var addCustomer = function(data) {
      console.log("adding you");
      return customerRef.push(data);
    }

    var addData = function(data){
      console.log("updating?");
        return  firebaseRef.update(data)
        };

    var getData = function(callback){
       return firebaseRef.$asArray();
      };


    var service = {
          addData : addData,
          getData: getData,
          addCustomer: addCustomer

        };

        return service;

    }])


    .factory('InstaService', ['$http', function ($http) {

      return {
        fetchPopular: function (callback){
        //  var endPoint = "https://api.instagram.com/v1/users/self/?access_token=ACCESS-TOKEN"
           var endPoint=
          // '"https://api.instagram.com/v1/users/self/?access_token=" + "token"';
          "https://api.instagram.com/v1/users/self/media/recent/?access_token=3549482147.acf87e4.3cf07755b49448db889bf0120b4af5d7&c&callback=JSON_CALLBACK&count=4"
          //  var endPoint=
          //  "https://api.instagram.com/v1/users/self/?access_token=3549482147.acf87e4.3cf07755b49448db889bf0120b4af5d7";


        $http.jsonp(endPoint).success(function(response){
          callback(response.data);
        });
      }
    }
    }]);
