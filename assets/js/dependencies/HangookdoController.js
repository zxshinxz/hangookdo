'user strict'

hangookdoApp.controller('MainCtrl',function($scope, HangookdoService, $fileUploader, $window) {
	 $scope.pageClass = 'page-home';
	 $scope.myInterval = 4000;
	 
	 var DesktopSlides = [
          {
          	style: {
      			'background': 'url("images/title_1_c.png")',
      			'background-color': '#8f2831',
      			'background-repeat': 'no-repeat',
      			'background-position': 'center'
          	}
          },{
          	style: {
          		'background': 'url("images/title_2_c.png")',
          		'background-color': '#000000',
      			'background-repeat': 'no-repeat',
      			'background-position': 'center'
  			}
          },{
      		style: {
      			'background': 'url("images/title_3_c.png")',
      			'background-color': '#3D577A',
      			'background-repeat': 'no-repeat',
      			'background-position': 'center'
      			}
          },{
      		style: {
      			'background': 'url("images/title_4_c.png")',
      			'background-color': '#FFA300',
      			'background-repeat': 'no-repeat',
      			'background-position': 'center'
      			}
          },{
      		style: {
      			'background': 'url("images/title_5_c.png")',
      			'background-color': '#AEBD63',
      			'background-repeat': 'no-repeat',
      			'background-position': 'center'
      			}
          }
  	  ];
	 
	 var MobileSlides = [
          {
          	style: {
      			'background': 'url("images/title_1_m.png")',
      			'background-color': '#8f2831',
      			'background-repeat': 'no-repeat',
      			'background-position': 'center'
          	}
          },{
          	style: {
          		'background': 'url("images/title_2_m.png")',
          		'background-color': '#000000',
      			'background-repeat': 'no-repeat',
      			'background-position': 'center'
  			}
          },{
      		style: {
      			'background': 'url("images/title_3_m.png")',
      			'background-color': '#3D577A',
      			'background-repeat': 'no-repeat',
      			'background-position': 'center'
      			}
          },{
      		style: {
      			'background': 'url("images/title_4_m.png")',
      			'background-color': '#FFA300',
      			'background-repeat': 'no-repeat',
      			'background-position': 'center'
      			}
          },{
      		style: {
      			'background': 'url("images/title_5_m.png")',
      			'background-color': '#AEBD63',
      			'background-repeat': 'no-repeat',
      			'background-position': 'center'
      			}
          }
  	  ];
	 
	 function getSlides(){
		 if($window.innerWidth < 768){
			 $scope.slides = MobileSlides;
		 }else{
			 $scope.slides = DesktopSlides;
		 }
	 }
	 
	 getSlides();
	 
	 angular.element($window).bind('resize', function() {
		 getSlides();
	 });
	  
//	  $scope.addSlide = function() {
//	    var newWidth = 600 + slides.length;
//	    slides.push({
//	      image: 'http://placekitten.com/' + newWidth + '/300',
//	      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
//	        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
//	    });
//	  };
//	  for (var i=0; i<4; i++) {
//	    $scope.addSlide();
//	  }
});


hangookdoApp.controller('AboutCtrl',function($scope, $location, $anchorScroll) {
	$scope.pageClass = 'page-about';
	$scope.gotoTop = function (){
	    // set the location.hash to the id of
	    // the element you wish to scroll to.
		if(arguments[0] == undefined || arguments[0] == null)
			$location.hash('top-page');
		else{
			$location.hash(arguments[0]);
		}
		
	    // call $anchorScroll()
	    $anchorScroll();
	  };
});


hangookdoApp.controller('ContactCtrl',function($scope, HangookdoService, $location, $anchorScroll) {
	$scope.pageClass = 'page-contact';
	$scope.gotoTop = function (){
	    // set the location.hash to the id of
	    // the element you wish to scroll to.
		if(arguments[0] == undefined || arguments[0] == null)
			$location.hash('top-page');
		else{
			$location.hash(arguments[0]);
		}
		
	    // call $anchorScroll()
	    $anchorScroll();
	  };
	  
	  $scope.email;
	  
	  $scope.sendEmail = function(){
		  HangookdoService.sendEmail($scope.email).then(function(data){
			  alert(data);
			  $scope.email = {};
		  });
		 
	  };
});


hangookdoApp.controller('LinksCtrl',function($scope) {
	$scope.pageClass = 'page-links';
});


hangookdoApp.controller('MembershipCtrl',function($scope, $location, $anchorScroll) {
	$scope.pageClass = 'page-membership';
	$scope.gotoTop = function (){
	    // set the location.hash to the id of
	    // the element you wish to scroll to.
		if(arguments[0] == undefined || arguments[0] == null)
			$location.hash('top-page');
		else{
			$location.hash(arguments[0]);
		}
		
	    // call $anchorScroll()
	    $anchorScroll();
	  };
});


hangookdoApp.controller('LoginCtrl',function($scope, $location, HangookdoService) {
	$scope.pageClass = 'page-login';
	$scope.invalidLogin =false;
	$scope.isLogin = false;
	$scope.login = function(user){
		$scope.isLogin = true;
		
		$scope.promise = HangookdoService.login(user);
		
		$scope.promise.then(function(result){
			if(result.isUserActive)
				$location.path('/');
			else
				$location.path('/activate');
			$scope.isLogin = false;
		});
		
		$scope.promise.catch(function(data){
			 $scope.isLogin = false;
			 alert(data);
		 });
	};
});


hangookdoApp.controller('RegisterCtrl',function($scope, $location, HangookdoService) {
	$scope.pageClass = 'page-register';
	$scope.user,
	$scope.checkRequestId = {};
	$scope.checkRequestEmail = {};
	$scope.isRegister = false;
	$scope.cancelRegistration = function(){
		$location.path('/');
	};
	
	$scope.createUser = function(){
		$scope.isRegister = true;
		
		$scope.promise = HangookdoService.createUser($scope.user);
		
		$scope.promise.then(function(data){
			 $scope.isRegister = false;
			 alert(data);
			 $location.path('/activate');
		 });
		
		$scope.promise.catch(function(data){
			 $scope.isRegister = false;
			 alert(data);
		 });
	};
	
	$scope.$watch("user.userId",function(newVal){
		
		if(newVal == undefined || newVal== null)
			return;
		
		
		if($scope.checkRequestId.state)
			if($scope.checkRequestId.state === "pending")
					$scope.checkRequestId.request.reject("cancel due to new request");
		
		
		if(newVal.length < 5)
			return;
		
		$scope.checkRequestId.request = HangookdoService.checkId(newVal);
		$scope.checkRequestId.state = "pending";
		
		$scope.checkRequestId.request.promise.then(function(data){
			$scope.user.idValid = data.isAvailable;
			$scope.checkRequestId.state = "resolved";
		},function(failReason){
			console.log(failReason);
		});
		
	});
	
	$scope.$watch("user.email",function(newVal){
		
		if(newVal == undefined || newVal== null)
			return;
		
		if($scope.checkRequestEmail.state == "pending")
				$scope.checkRequestEmail.request.reject("cancel due to new request");
		
		
		if (!EMAIL_REGEXP.test(newVal)) 
			return;
        
		
		$scope.checkRequestEmail.request = HangookdoService.checkEmail(newVal);
		$scope.checkRequestEmail.state = "pending";
		
		$scope.checkRequestEmail.request.promise.then(function(data){
			$scope.user.emailValid = data.isAvailable;
			$scope.checkRequestEmail.state = "resolved";
		},function(failReason){
			console.log(failReason);
		});
		
	});
	
});


hangookdoApp.controller('NavCtrl',function($scope, $location, $cookieStore, HangookdoService) {
	
	$scope.isLoggedIn;
	
	$scope.getFullName = function(){
		var user = HangookdoService.getUser().user;
		$scope.fullName = user.firstname +" "+ user.lastname;
	}
	
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    
    $scope.service = HangookdoService;
    
    $scope.logOut = function(){
    	HangookdoService.logout();
    }
    
    $scope.$watch("service.isLoggedIn()",function(newVal){
    	$scope.isLoggedIn = newVal;
    	if($scope.fullName == undefined){
    		$scope.getFullName();
    	}
    });
    
});

hangookdoApp.controller('ActivateCtrl',function($scope, HangookdoService) {
	$scope.pageClass = 'page-activate';
	$scope.isActivate = false;

	$scope.reactivate = function(){
		$scope.isActivate = true;
		
		$scope.promise = HangookdoService.reactivate();
		
		$scope.promise.then(function(data){
			alert(data);
			$scope.isActivate = false;
		});
		
		$scope.promise.catch(function(data){
			alert(data);
			$scope.isActivate = false;
		});
	};
	
});


hangookdoApp.controller('ActiveCtrl',function($scope, $location, HangookdoService) {
	$scope.pageClass = 'page-active';
	$scope.login = function(){
		$location.path('login');
	};
});

hangookdoApp.controller('InvalidCtrl',function($scope, $location) {
	$scope.pageClass = 'page-active';
	$scope.redirectReset = function(){
		$location.path('lostpassword');
	};
});

hangookdoApp.controller('LostPasswordCtrl',function($scope, $location, HangookdoService) {
	$scope.user,
	$scope.isLostPassword = false;
	$scope.cancelLostPassword = function(){
		$location.path('/');
	};
	
	$scope.resetPassword = function(){
		$scope.isLostPassword = true;
		$scope.promise = HangookdoService.resetPassword($scope.user);
		 
		$scope.promise.then(function(data){
			 $scope.isLostPassword = false;
			 alert(data);
			 $location.path('/');
		 });
		
		$scope.promise.catch(function(data){
			 $scope.isLostPassword = false;
			 alert(data);
		 });
	};
});

hangookdoApp.controller('ResetCtrl',function($scope, $location, HangookdoService) {
	$scope.user,
	$scope.isNewPassword = false;
	$scope.cancelNewPassword = function(){
		$location.path('/');
	};
	
	$scope.newPassword = function(){
		$scope.isNewPassword = true;
		$scope.promise = HangookdoService.newPassword($scope.user);
		 
		$scope.promise.then(function(data){
			 $scope.isNewPassword = false;
			 alert(data);
			 $location.path('/');
		 });
		
		$scope.promise.catch(function(data){
			 $scope.isNewPassword = false;
			 alert(data);
		 });
	};
});


hangookdoApp.controller('FooterCtrl',function($scope, $location, $anchorScroll) {
	
	 $scope.gotoTop = function (){
		 
	    // set the location.hash to the id of
	    // the element you wish to scroll to.
		if(arguments[0] == undefined || arguments[0] == null)
			$location.hash('top-page');
		else{
			$location.hash(arguments[0]);
		}

	    // call $anchorScroll()
	    $anchorScroll();
	  };
});

