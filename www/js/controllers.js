angular.module('app.controllers', [])

// .controller("AppCtrl", function($scope, $q, Auth, $state, $firebaseObject, $ionicHistory, userService) {
//
//
//   $scope.click = function() {
//     console.log("clicking");
//   }
//
//   var ref = new Firebase("https://flowershop.firebaseio.com");
//   // var userRef = ref.child('users');
//   var authData = ref.getAuth();
//
//     $scope.appState = {
//     user: undefined,
//     };
//
//     $scope.refreshAuthData = function() {
//     var dfd = $q.defer();
//     var authData = ref.getAuth();
//
//     if (authData) {
//     var loggedInUserRef = new Firebase(ref + "/users/" + authData.uid);
//     var user = $firebaseObject(loggedInUserRef);
//     userService.set('user', user)
//     //  console.log('hello from userSet')
//     // $scope.appState.user = user;
//     dfd.resolve(user);
//     //    console.log(user);
//     $scope.$apply()
//
//     } else {
//     dfd.reject();
//     $state.go('app.login');
//     }
//
//     return dfd.promise
//     }
//
//


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
  }, 9000);

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
    var ref = new Firebase("https://flowershop.firebaseio.com");

    var authData = ref.getAuth();
    console.log(authData);
      if (authData) {
          $state.go('menu.cloud');
      }


  $scope.loginEmail = function(data){
    var ref = new Firebase("https://flowershop.firebaseio.com");
   console.log(data);

    ref.authWithPassword({
      email    : data.email,
      password : data.password
    }, function(error, authData) {
      if (error) {

    //$scope.loginFailed();
    console.log("error");

    }  else {

    console.log("Authenticated successfully with payload:", authData);

      $state.go('menu.cloud');
    }
  });


  };
})

.controller('cloudCtrl', function($scope, dataService, store) {

//TODO: CHECK FOR CORDOVA, IF NO HIDE EMAIL FUNCTION
//   $scope.$on('$ionicView.enter', function() {
//
//   try {
//     cordova.plugins.email.isAvailable(
//     function (isAvailable) {
//        alert('Service is not available');
//     }
// );
// } catch (e) {
//
// if(e instanceof ReferenceError == true){
//   hideEmail();
//
// }
// }
// })

var cordaE = angular.element( document.querySelector( '#cordoEm' ) );

  hideEmail = function () {
    var cordaE = angular.element( document.querySelector( '#cordoEm' ) );

console.log("there is an error");
cordaE.removeClass('hide');
}
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
var yesCustMenu = angular.element( document.querySelector( '#customerMenu' ) );

$scope.yesCust = function () {
console.log("hey");
yesCustMenu.removeClass('hide');
}

$scope.noCust = function () {
console.log("no");
yesCustMenu.addClass('hide');

}
$scope.openTime = function() {



}
  $scope.form = {
      // mfam: '',
      // mflunch: '',
      // mfpm: '',
      // mfclose: '',
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

  $scope.customers = dataService.getCustomers();

  if (store.get('currentCustomer')) {
     $scope.currentCustomer = store.get('currentCustomer')
   }
   $scope.selectCurrentCustomer = function (i) {
   //  $scope.currentMember.firstName = currentMember.firstName;
   //StorageService.add(currentMember);
   if($scope.currentCustomer) {
     $scope.currentCustomer = ''
   }
     store.set('currentCustomer', i);
       console.log(i.email)
       console.log(i.num);
   }

$scope.checkCordovaAvail = function() {
$scope.currentCustomer = store.get('currentCustomer')
    try {

      cordova.plugins.email.open({
      to:      $scope.currentCustomer.email,
      subject: 'Thanks for Stopping By in bloom!',
      body:    "<p>Sorry we missed you!<p><p>Please let me know how we can help!</p><p>in bloom<p>"
    //  body:    "<p>Sorry we missed you!<p> <br> <p>Please let me know how I can help!</p>"
   });
  } catch (e) {

      if(e instanceof ReferenceError == true){
      alert("This email service is not available on you current device.")

      } else {
    //  $scope.sendEmail();
  }
}
}

//   $scope.sendEmail = function(){
//     $scope.currentCustomer = store.get('currentCustomer')
//     console.log( $scope.currentCustomer.email);
//       cordova.plugins.email.open({
//       to:      $scope.currentCustomer.email,
//       //cc:      'erika@mustermann.de',
//     //  bcc:     ['john@doe.com', 'jane@doe.com'],
//       subject: 'Thanks for Stopping By in bloom!',
//       body:    "<p>Sorry we missed you!<p><p>Please let me know how we can help!</p><p>in bloom<p>"
//    });
//
// }

  $scope.startCall = function () {
    $scope.currentCustomer = store.get('currentCustomer')

    console.log($scope.currentCustomer.num);
    //$scope.currentCustomer.num = phoneNumber
    $scope.three =   $scope.currentCustomer.num.slice(0,3);
    console.log($scope.three);
    $scope.nextThree =   $scope.currentCustomer.num.slice(3,6);
    console.log($scope.nextThree);
    $scope.four =   $scope.currentCustomer.num.slice(6,11);
    console.log($scope.four);






  }

//   var customerRef = new Firebase("https://flowershop.firebaseio.com/Customers")
//   customerRef.once("value", function(snapshot){
//    $scope.customers = snapshot.val();
//    console.log($scope.customers);
// })

})

.controller('loginCtrl', function($scope) {

})
