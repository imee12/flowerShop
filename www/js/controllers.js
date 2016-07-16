angular.module('app.controllers', [])

.controller('homeCtrl', function($scope, $state, dataService, $timeout, InstaService) {


  getPhotos = function() {
  InstaService.fetchPopular(function(data){
        $scope.pics = data;
        console.log($scope.pics);
      });
}
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
    // getPhotos();
  }, 5000);

   $scope.$on('$ionicView.enter', function() {
     checkStatus();
     getPhotos();
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
    $scope.satpmhour = data.satpmStart;
    $scope.satclosingTime = data.satClose;

    $scope.sunamhour = data.sunamStart;
    $scope.sunlunchBreak = data.sunLunch;
    $scope.sunpmhour = data.sunpmStart;
    $scope.sunclosingTime = data.sunClose;

    console.log($scope.amhour);

var satTime = angular.element( document.querySelector( '#satHours' ) );
var satClose = angular.element( document.querySelector( '#closeSat' ) );
var sunTime = angular.element( document.querySelector( '#sunHours' ) );
var sunClose = angular.element( document.querySelector( '#closeSun' ) );


if(data.satOpen != true) {
  console.log("closed saturday");
  satTime.addClass('hide');
  satClose.removeClass("hide");
  $scope.status = "closed";
}

if(data.satOpen == true) {
  console.log("open saturday");
  satTime.removeClass('hide');
  satClose.addClass("hide");
}

if(data.sunOpen != true) {
  console.log("closed sunday");
  sunTime.addClass('hide');
  sunClose.removeClass("hide");
}

if(data.sunOpen == true) {
  console.log("close sunday");
  sunTime.removeClass('hide');
  sunClose.addClass("hide");

}

  var now = new Date();
  var hours = now.getHours();
  var minute = now.getMinutes();
  var day = now.getDay();
  console.log(day);
  console.log(hours, minute, day);
  var changeToday = moment(new Date(1899,11,31,hours,minute)).unix()
  // var changeToday = new Date(1899,11,31,hours,minute);


  console.log(changeToday);


if (day == 1 || day == 2 ||day == 3 ||day == 4 ||day == 5){
  $scope.status = "open"
  console.log("it's m-f");
  var lunchTime =  moment(new Date($scope.lunchBreak).toLocaleString()).unix();
   console.log(lunchTime)
   var opening = moment(new Date($scope.amhour).toLocaleString()).unix();
   console.log(opening);
   var pmopening =  moment(new Date($scope.pmhour).toLocaleString()).unix();
   console.log(pmopening);
   var closing =  moment(new Date($scope.closingTime).toLocaleString()).unix();
   console.log(closing);


  if(changeToday < opening) {
    $scope.status = "closed"
  }
  if(changeToday > closing) {
    $scope.status = "closed"
  }
  if(changeToday > lunchTime && changeToday > opening && changeToday < pmopening) {
    $scope.status = "closed"
  }

}
  if(day == 6) {
    $scope.status = "open"
    console.log("it's Saturday");
    var lunchTime =  moment(new Date($scope.satlunchBreak).toLocaleString()).unix();
     console.log(lunchTime)
     var opening = moment(new Date($scope.satamhour).toLocaleString()).unix();
     console.log(opening);
     var pmopening =  moment(new Date($scope.satpmhour).toLocaleString()).unix();
     console.log(pmopening);
     var closing =  moment(new Date($scope.satclosingTime).toLocaleString()).unix();
     console.log(closing);


     if(data.satOpen != true) {
       $scope.status = "closed";
     }
     if(changeToday < opening) {
       $scope.status = "closed"
     }
     if(changeToday > closing) {
       $scope.status = "closed"
     }
     if(changeToday > lunchTime && changeToday > opening && changeToday < pmopening) {
       $scope.status = "closed"
     }
  }

  if(day == 7) {
    $scope.status = "open"
    console.log("it's Sunday!");
    var lunchTime =  moment(new Date($scope.sunlunchBreak).toLocaleString()).unix();
     console.log(lunchTime)
     var opening = moment(new Date($scope.sunamhour).toLocaleString()).unix();
     console.log(opening);
     var pmopening =  moment(new Date($scope.sunpmhour).toLocaleString()).unix();
     console.log(pmopening);
     var closing =  moment(new Date($scope.sunclosingTime).toLocaleString()).unix();
     console.log(closing);

     if(changeToday < opening) {
       $scope.status = "closed"
     }
     if(changeToday > closing) {
       $scope.status = "closed"
     }
     if(changeToday > lunchTime && changeToday > opening && changeToday < pmopening) {
       $scope.status = "closed"
     }
  }

  var emailBlock = angular.element( document.querySelector( '#emailSubmit' ) );
  var firstI= angular.element( document.querySelector( '#firstInsta' ) );
  var secI = angular.element( document.querySelector( '#secInsta' ) );

  if($scope.status == "closed") {

  console.log("holla if ya hear me");
   emailBlock.removeClass('hide');
  //  secI.removeClass('hide');
     firstI.addClass('none');

}

if($scope.status == "open") {

console.log("holla if ya hear me");
 emailBlock.addClass('hide');
//  secI.removeClass('hide');
firstI.removeClass('none');


}
})// snapshot END

}// checkStatus END



var thanks = angular.element( document.querySelector( '#thankYou' ) );

$scope.msg = {};

$scope.savemsg = function() {
  console.log($scope.msg);
  dataService.addCustomer($scope.msg);
  thanks.removeClass('hide');
  $scope.reset();
  $scope.clearThanks();
}

$scope.clearThanks = function() {
setTimeout(function(){
  thanks.addClass('hide');
}, 5000);
}

$scope.reset = function() {
  $scope.msg = {};
}

$scope.areYouClosed = function() {



}
  $scope.ownerLogin = function() {
    console.log("hi");
     $state.go('menu.cart');
  }


}) // end home controller

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

   $scope.satamhour = data.satamStart;
   $scope.satlunchBreak = data.satLunch;
   $scope.satpmhour = data.satpmStart;
   $scope.satclosingTime = data.satClose;

   $scope.sunamhour = data.sunamStart;
   $scope.sunlunchBreak = data.sunLunch;
   $scope.sunpmhour = data.sunpmStart;
   $scope.sunclosingTime = data.sunClose;
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

var yesSunMenu = angular.element( document.querySelector( '#menuSun' ) );

$scope.yesSun = function () {
console.log("hey");
yesSunMenu.removeClass('hide');
dataService.addData({
  sunOpen: true
})
}

$scope.noSun = function () {
console.log("no");
yesSunMenu.addClass('hide');

dataService.addData({
  sunOpen: false
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
    ref.update({
      amStart: $scope.form.mfam || $scope.amhour || '',
      wkdayLunch: $scope.form.mflunch || $scope.lunchBreak || '',
      pmStart: $scope.form.mfpm || $scope.pmHour || '',
      wkdayClose: $scope.form.mfclose || $scope.closingTime || '',
    })

  }

  $scope.satform = {
      satam: '',
      satlunchBreak: '',
      satpm: '',
      satclose: '',
    }

  $scope.saveHoursSat = function() {
    console.log($scope.satform);
    ref.update({
      satamStart: $scope.satform.satam || $scope.satamhour || '',
      satLunch: $scope.satform.satlunch || $scope.satlunchBreak || '',
      satpmStart: $scope.satform.satpm || $scope.satpmhour || '',
      satClose: $scope.satform.satclose || $scope.satclosingTime || '',
    })

  }

  $scope.sunform = {
      sunam: '',
      sunlunch: '',
      sunpm: '',
      sunclose: '',
    }

  $scope.saveHoursSun = function() {
    console.log($scope.sunform);
    ref.update({
      sunamStart: $scope.sunform.sunam || $scope.sunamhour || '',
      sunLunch: $scope.sunform.sunlunch || $scope.sunlunchBreak || '',
      sunpmStart: $scope.sunform.sunpm || $scope.sunpmhour || '',
      sunClose: $scope.sunform.sunclose || $scope.sunclosingTime || '',
    })

  }

})

.controller('loginCtrl', function($scope) {

})
