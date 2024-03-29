angular.module('app.controllers', [])

.controller('homeCtrl', function($scope, $state, dataService, $timeout, InstaService) {
  $scope.status = "open";


  getPhotos = function() {
  InstaService.fetchPopular(function(data){
        $scope.pics = data;
        console.log($scope.pics);
    });
}
  startdaTimer = function(){
    var stats = angular.element( document.querySelector( '#statusmsg' ) );
    var errs = angular.element( document.querySelector( '#errandmsg' ) );
    console.log("you starting?");
    setTimeout(function(){
      stats.removeClass('hide');
      errs.addClass('hide');
      dataService.addData({
        errand: false
    })
  }, 900000);
  }
  $scope.clock = "loading clock...";
      $scope.tickInterval = 1000

      var tick = function() {
          $scope.clock = Date.now()
          $timeout(tick, $scope.tickInterval);
  }

      $timeout(tick, $scope.tickInterval);

  setInterval(function(){
    checkStatus();
  }, 9000);

   $scope.$on('$ionicView.enter', function() {
     checkStatus();
     getPhotos();
   })

   checkStatus = function() {

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
    $scope.errandStatus = data.errand;
    console.log($scope.errandStatus);

    console.log($scope.amhour);

var satTime = angular.element( document.querySelector( '#satHours' ) );
var satClose = angular.element( document.querySelector( '#closeSat' ) );
var sunTime = angular.element( document.querySelector( '#sunHours' ) );
var sunClose = angular.element( document.querySelector( '#closeSun' ) );
var stats = angular.element( document.querySelector( '#statusmsg' ) );
var errs = angular.element( document.querySelector( '#errandmsg' ) );


var emailBlock = angular.element( document.querySelector( '#emailSubmit' ) );
var firstI= angular.element( document.querySelector( '#firstInsta' ) );
var secI = angular.element( document.querySelector( '#secInsta' ) );

if($scope.status == "closed") {
  console.log("close email");
 emailBlock.removeClass('hide');
   firstI.addClass('none');
}

if($scope.status == "open") {
console.log("we open");
emailBlock.addClass('hide');
firstI.removeClass('none');
}

if($scope.status == "open" && $scope.errandStatus == true) {
console.log("shuter down");
emailBlock.removeClass('hide');
 firstI.addClass('none');}

if(data.errand == true) {
  stats.addClass('hide');
  errs.removeClass('hide');
  $scope.status = "closed";
  startdaTimer();
}

if(data.errand != true) {
  console.log("back errand");
  stats.removeClass('hide');
  errs.addClass('hide');
  $scope.status = "open";
}


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

  $scope.ownerLogin = function() {
    console.log("hi");
     $state.go('menu.cart');
  }


}) // end home controller

.controller('cartCtrl', function($scope, $state) {
 $scope.$on('$ionicView.enter', function() {
    var ref = new Firebase("https://flowershop.firebaseio.com");

    var authData = ref.getAuth();
    console.log(authData);
      if (authData) {
          $state.go('menu.cloud');
      }
})


  $scope.loginEmail = function(data){
    var ref = new Firebase("https://flowershop.firebaseio.com");
   console.log(data);

    ref.authWithPassword({
      email    : data.email,
      password : data.password
    }, function(error, authData) {
      if (error) {

    console.log("error");

    }  else {

    console.log("Authenticated successfully with payload:", authData);
      $state.go('menu.cloud');
    }
  });


  };
})

.controller('cloudCtrl', function($scope, dataService, store, $state, $ionicPopup) {

  $scope.errand = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Heading out for a delivery?',
     template: 'I will change the sign to OUT FOR DELIVERY for 15 mins.'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
       $scope.errandTimer();
     } else {
       console.log('You are not sure');
     }
   });
 }

 $scope.errandBack = function() {
  var confirmPopup = $ionicPopup.confirm({
    title: 'Are you back in the store?',
    template: 'I will update the sign.'
  });

  confirmPopup.then(function(res) {
    if(res) {
      console.log('You are sure');
      dataService.addData({
        errand: false
    })
    } else {
      console.log('You are not sure');
    }
  });
}


 var stats = angular.element( document.querySelector( '#statusmsg' ) );

 $scope.errandTimer = function() {
   console.log("out for errand");
   dataService.addData({
     errand: true
 })
 }


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
  $scope.form = {}

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
   });
  } catch (e) {

      if(e instanceof ReferenceError == true){
      $scope.showAlert();

      } else {
  }
}
}

$scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Oh no!',
     template: 'This email service is not available on your current device.'
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };

$scope.deleteCust = function(i) {
  console.log("delete yo");
  dataService.deleteData(i);

}

  $scope.startCall = function () {
    $scope.currentCustomer = store.get('currentCustomer')

    console.log($scope.currentCustomer.num);
    $scope.three =   $scope.currentCustomer.num.slice(0,3);
    console.log($scope.three);
    $scope.nextThree =   $scope.currentCustomer.num.slice(3,6);
    console.log($scope.nextThree);
    $scope.four =   $scope.currentCustomer.num.slice(6,11);
    console.log($scope.four);
  }

  $scope.logout = function (data) {
    ref.unauth();
    console.log("bye");
    $state.go('menu.home');
  };


})

.controller('loginCtrl', function($scope) {

})
