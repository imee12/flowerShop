angular.module('app.controllers', [])

.controller('homeCtrl', function($scope, $state) {
  $scope.time = new Date().toISOString();
  console.log($scope.time);

  $scope.status = "OPEN";

  $scope.ownerLogin = function() {
    console.log("hi");
     $state.go('menu.login');
  }


})

.controller('cartCtrl', function($scope, $state) {
  $scope.loginEmail = function(data){
    var ref = new Firebase("https://flowershop.firebaseio.com");
   console.log(data);

    ref.authWithPassword({
      email    : data.email,
      password : data.password
    }, function(error, authData) {
      if (error) {

    $scope.loginFailed();

    }  else {

    console.log("Authenticated successfully with payload:", authData);

      $state.go('menu.cloud');
    }
  });


  };
})

.controller('cloudCtrl', function($scope) {

$scope.openTime = function() {



}
  $scope.form = {
      mfam: '',
      mfpm: '',
      sat: '',
      sun: '',
      beback: '',
    }

  $scope.saveHours = function() {
    console.log($scope.form);
  }

})

.controller('loginCtrl', function($scope) {

})
