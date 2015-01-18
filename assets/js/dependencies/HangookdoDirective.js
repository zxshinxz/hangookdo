'user strict'

hangookdoApp.directive('scrollSpy', function($window, $document) {
	return {
		controller: function($scope){
			
			$scope.spies = [];
			
			this.addSpy = function(spyObject){
				$scope.spies.push(spyObject);
			}
		},
		link: function(scope, element, attrs, ctrl) {
			
			var spyElems = new Object();
			
			scope.$watch('spies', function(){
				scope.spies.forEach(function(spy){
					if(spyElems[spy.id] == undefined)
						spyElems[spy.id] = element.find('#'+spy.id);
				});
			});
			
			
			function findActiveSpy(){
				
				if($window.scrollY + $window.innerHeight == $document.height()){
					scope.spies.forEach(function(spy){
						if(spy.isEnd)
							spy.active();
						else
							spy.deactive();
					});
					return;
				}
				
				scope.spies.forEach(function(spy){
					var start = spyElems[spy.id].offset().top;
					var end = spyElems[spy.id].height() + start + 20;
					
					if( start <= $window.scrollY || spy.isStart){
						if($window.scrollY <= end || spy.isEnd){
							spy.active();
						}else{
							spy.deactive();
						}
					}else{
						spy.deactive();
					}
				});
			}
			
			return angular.element($window).bind('scroll', function() {
				findActiveSpy();
			});
		}
	}
});

hangookdoApp.directive('spy', function($window, $location, $anchorScroll) {
	return {
		restrict: "A",
		scope: {
			firstspy: '=?',
			lastspy: '=?',
		},
		require: "^scrollSpy",
		link: function(scope, element, attrs, parentCtrl) {
			
			 scope.firstspy = scope.firstspy || false;
			 scope.lastspy = scope.lastspy || false;
			 
			 
			 
			 element.click(function () {
			        $location.hash(attrs.spy);
			        $anchorScroll();
		      });
			 
//			 element.bind('click', function() {
//			        $location.hash(attrs.spy);
//			        $anchorScroll();
//		      });
			
			parentCtrl.addSpy(
				{
			        id: attrs.spy,
			        isStart: scope.firstspy,
			        isEnd: scope.lastspy,
			        active: function() {
			        	element.addClass('active');
			        },
			        deactive: function() {
			        	element.removeClass('active');
			        }
				}
			);
		}
	}
});

hangookdoApp.directive('angularAffix', function($window) {
	return {
		scope: {
			top: '@',
			bottom: '@'
		}, 
		link: function($scope, element, attrs) {
			
			var temp = $window;
			$scope.resolveClass = function(){
				
				atMiddle();
				
				if(attrs.top != undefined)
					if($window.scrollY <  attrs.top)
						atTop();
				
				
				if(attrs.bottom != undefined)
					if($window.scrollY >  attrs.bottom)
						atBottom();
				
			};
			
			function atTop(){
				element.removeClass('affix');
				element.removeClass('affix-bottom');
				element.addClass('affix-top');
			}
			
			function atMiddle(){
				element.removeClass('affix-top');
				element.removeClass('affix-bottom');
				element.addClass('affix');
			}

			function atBottom(){
				element.removeClass('affix');
				element.removeClass('affix-top');
				element.addClass('affix-bottom');
			}
			
			return angular.element($window).bind('scroll', function() {
				$scope.resolveClass();
			});
			
		}
	}
});

var INTEGER_REGEXP = /^\-?\d+$/;
hangookdoApp.directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          ctrl.$setValidity('integer', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('integer', false);
          return undefined;
        }
      });
    }
  };
});

var ALPHABET_REGEXP = /^[A-Za-z\s]+$/;
hangookdoApp.directive('alphabet', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
    	  if (ALPHABET_REGEXP.test(viewValue)) {
          // it is valid
          ctrl.$setValidity('alphabet', true);
          return viewValue;
        } else {
          // it is invalid, return undefined (no model update)
          ctrl.$setValidity('alphabet', false);
          return undefined;
        }
      });
    }
  };
});

var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
hangookdoApp.directive('email', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elm, attrs, ctrl) {
	      ctrl.$parsers.unshift(function(viewValue) {
	        if (EMAIL_REGEXP.test(viewValue)) {
	          // it is valid
	          ctrl.$setValidity('email', true);
	          return viewValue;
	        } else {
	          // it is invalid, return undefined (no model update)
	          ctrl.$setValidity('email', false);
	          return undefined;
	        }
	      });
	    }
	  };
	});


hangookdoApp.directive('minLength', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elm, attrs, ctrl) {
	      ctrl.$parsers.unshift(function(viewValue) {
	        if (viewValue.length > parseInt(attrs.minLength)) {
	          // it is valid
	          ctrl.$setValidity('minLength', true);
	          return viewValue;
	        } else {
	          // it is invalid, return undefined (no model update)
	          ctrl.$setValidity('minLength', false);
	          return undefined;
	        }
	      });
	    }
	  };
	});

hangookdoApp.directive('disableAnimation', function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    }
});

hangookdoApp.directive('same', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, elm, attrs, ctrl) {
	      ctrl.$parsers.unshift(function(viewValue) {
	        if (viewValue === attrs.same) {
	          // it is valid
	          ctrl.$setValidity('same', true);
	          return viewValue;
	        } else {
	          // it is invalid, return undefined (no model update)
	          ctrl.$setValidity('same', false);
	          return undefined;
	        }
	      });
	    }
	  };
	});


//hangookdoApp.directive('hide', function($animate){
//    return {
//        restrict: 'A',
//        link: function($scope, $element, $attrs){
//        	$attrs.$observe('hide', function(value){
//        		if(value){
//            		$element.addClass('hide');
//            	}
//            	
//            	if(!value){
//            		$element.removeClass('hide');
//            	}
//            });
//        }
//    }
//});

//
// hangookdoApp.directive('resizable', function($window) {
//	return function($scope) {
////		$scope.initializeWindowSize = function() {
////			$scope.windowHeight = $window.innerHeight;
////			return $scope.windowWidth = $window.innerWidth;
////		};
//		
//		
////		$scope.initializeWindowSize();
//		
//		$scope.calcLeft = function(){
//			$scope.windowLeft = ($window.innerWidth - 1000)/2;
//		};
//		
//		$scope.calcLeft();
//		
//		return angular.element($window).bind('resize', function() {
//			$scope.calcLeft();
//			return $scope.$apply();
//		});
//	};
//});