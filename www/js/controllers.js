angular.module('app.controllers', [])

.controller('homeCtrl', function($scope, $state, dataService) {
   $scope.status = "open";

//   init()
//   function init(){
// console.log("init");
//         $scope.hours = dataService.getData();
//         console.log($scope.hours);
//       }

var ref = new Firebase("https://flowershop.firebaseio.com")
  ref.once("value", function(snapshot){
    var data = snapshot.val();
    console.log(data);
    $scope.amhour = data.amStart;
    $scope.lunchBreak = data.wkdayLunch;
    $scope.pmhour = data.pmStart;
    $scope.closingTime = data.wkdayClose;
    console.log($scope.amhour);


  $scope.time = new Date().toISOString();
  var now = new Date();
  var hours = now.getHours();
  var minute = now.getMinutes();
  var day = now.getDay();
  console.log(hours, minute, day);
 var changeToday = moment(new Date(1899,11,31,hours,minute)).unix()
  // var changeToday = new Date(1899,11,31,hours,minute);


  console.log(changeToday);

 var lunchTime =  moment(new Date($scope.lunchBreak).toLocaleString()).unix();
  console.log(lunchTime)
  var opening = moment(new Date($scope.amhour).toLocaleString()).unix();
  console.log(opening);
  var closing =  moment(new Date($scope.closingTime).toLocaleString()).unix();
  console.log(closing);
if (day == 1 || day == 2 ||day == 3 ||day == 4 ||day == 5){
  console.log("it's not saturday");
  if(changeToday < opening) {
    $scope.status = "closed"
  }
  if(changeToday < closing) {
    $scope.status = "closed"
  }
  if(changeToday < lunchTime && changeToday > opening) {
    $scope.status = "closed"
  }
  if(changeToday < lunchTime && changeToday > closing) {
    $scope.status = "closed"
  }
}
  if(day == 6) {
    console.log("it's Saturday");
  }

  if(day == 7) {
    console.log("it's Sunday!");
  }

})



  $scope.ownerLogin = function() {
    console.log("hi");
     $state.go('menu.cart');
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

.controller('cloudCtrl', function($scope, dataService) {

$scope.openTime = function() {



}
  $scope.form = {
      mfam: '',
      mflunch: '',
      mfpm: '',
      mfclose: '',
      sat: '',
      sun: '',
      beback: '',
    }

  $scope.saveHours = function() {
    console.log($scope.form);
    dataService.addData({
      amStart: $scope.form.mfam || '',
      wkdayLunch: $scope.form.mflunch || '',
      pmStart: $scope.form.mfpm || '',
      wkdayClose: $scope.form.mfclose || '',
    })

  }

})

.controller('loginCtrl', function($scope) {

})
