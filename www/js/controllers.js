angular.module('app.controllers', [])

.controller('homeCtrl', function($scope, $state, dataService, $timeout) {
  $scope.status = "open";

  $scope.clock = "loading clock...";
      $scope.tickInterval = 1000

      var tick = function() {
          $scope.clock = Date.now()
          $timeout(tick, $scope.tickInterval);
  }

      $timeout(tick, $scope.tickInterval);

  setInterval(function(){
    checkStatus();
  }, 5000);

   $scope.$on('$ionicView.enter', function() {
     checkStatus();
   })

   checkStatus = function() {
    // $scope.timeNow = new Date().toISOString();
    // console.log($scope.time);

     console.log("checking");
   var ref = new Firebase("https://flowershop.firebaseio.com")
   ref.once("value", function(snapshot){
    var data = snapshot.val();
    console.log(data);
    $scope.amhour = data.amStart;
    $scope.lunchBreak = data.wkdayLunch;
    $scope.pmhour = data.pmStart;
    $scope.closingTime = data.wkdayClose;
    $scope.satamhour = data.satamStart;
    $scope.satlunchBreak = data.satLunch;
    $scope.sathour = data.satpmStart;
    $scope.satclosingTime = data.satClose;

    console.log($scope.amhour);

var satTime = angular.element( document.querySelector( '#satHours' ) );
var satClose = angular.element( document.querySelector( '#closeSat' ) );

if(data.satOpen != true) {
  console.log("open saturday");

  satTime.addClass('hide');
  satClose.removeClass("hide");

}

if(data.satOpen == true) {
  console.log("open saturday");

  satTime.removeClass('hide');
  satClose.addClass("hide");

}

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

}

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
  var ref = new Firebase("https://flowershop.firebaseio.com")
  ref.once("value", function(snapshot){
   var data = snapshot.val();
   console.log(data);
   $scope.amhour = data.amStart;
   $scope.lunchBreak = data.wkdayLunch;
   $scope.pmhour = data.pmStart;
   $scope.closingTime = data.wkdayClose;
 })

  var yesMenu = angular.element( document.querySelector( '#menuSat' ) );

$scope.yesSat = function () {
  console.log("hey");
  yesMenu.removeClass('hide');
  dataService.addData({
    satOpen: true
})
}

$scope.noSat = function () {
  console.log("no");
  yesMenu.addClass('hide');

  dataService.addData({
    satOpen: false
})

}
$scope.openTime = function() {



}
  $scope.form = {
      mfam: '',
      mflunch: '',
      mfpm: '',
      mfclose: '',
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

  $scope.satform = {
      satam: '',
      satlunch: '',
      satpm: '',
      satclose: '',
    }

  $scope.saveHoursSat = function() {
    console.log($scope.satform);
    dataService.addData({
      satamStart: $scope.form.satam || '',
      satwkdayLunch: $scope.form.satlunch || '',
      satpmStart: $scope.form.satpm || '',
      satwkdayClose: $scope.form.satclose || '',
    })

  }

  $scope.sunform = {
      sunam: '',
      sunlunch: '',
      sunpm: '',
      sunclose: '',
    }

  $scope.saveHoursSat = function() {
    console.log($scope.satform);
    dataService.addData({
      satamStart: $scope.form.satam || '',
      satwkdayLunch: $scope.form.satlunch || '',
      satpmStart: $scope.form.satpm || '',
      satwkdayClose: $scope.form.satclose || '',
    })

  }

})

.controller('loginCtrl', function($scope) {

})
