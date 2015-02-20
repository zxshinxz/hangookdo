'user strict'

var toolbar=[["h1","h2","h3","h4","h5","h6","p","pre","quote", "colourRed"],
             ["bold","italics","underline","strikeThrough","ul","ol","redo","undo","clear"],
             ["justifyLeft","justifyCenter","justifyRight","indent","outdent"],
             ["html","insertGalleryImage","insertLink","insertVideo","wordcount","charcount"]];

var cmsApp = angular.module('cmsHangookdo', ['ngRoute', 'ui.bootstrap', 'textAngular', 'angularFileUpload']);

cmsApp.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'templates/newslist.html',
		controller : 'newsListCtrl'
	}).when('/add', {
		templateUrl : 'templates/newsedit.html',
		controller : 'newsAddCtrl'
	}).when('/edit', {
		templateUrl : 'templates/newsedit.html',
		controller : 'newsEditCtrl'
	}).when('/gallery', {
		templateUrl : 'templates/gallery.html',
		controller : 'galleryCtrl'
	}).otherwise({redirectTo: '/'});
});

cmsApp.controller('newsListCtrl', function($scope, CMSHangookdoService, $window, $sce) {
	
	$scope.newslist = null;
	
	// Initialise news data
	$scope.promise = CMSHangookdoService.newsList();
	$scope.promise.then(function(result){
		$scope.newslist = result;
		for(key in $scope.newslist){
			$scope.newslist[key].content = $sce.trustAsHtml($scope.newslist[key].content)
		}
	});
	
	$scope.createNews = function(){
		$window.location.href = 'cms#/add';
	}
	
	$scope.editNews = function(newsItem){
		$window.location.href = 'cms#/edit?id=' + newsItem.id;
	}
	
	$scope.deleteNews = function(newsItem){

		var promise = CMSHangookdoService.deleteNews(newsItem.id);
		
		promise.then(function(result){
			$scope.backToNewsList();
		});
		promise.catch(function(data){
			 alert(data);
		 });
	}
	
	$scope.backToNewsList = function(){
		$window.location.href = 'cms';
	}
	
});

cmsApp.controller('newsAddCtrl', function($scope, CMSHangookdoService, $window) {
	
	$scope.toolbar = toolbar;
	
	$scope.heading = "Add News";
	
	$scope.backToNewsList = function(){
		$window.location.href = 'cms';
	}
	
	$scope.submit = function(){
		var promise = CMSHangookdoService.createNews($scope.formData);
		
		promise.then(function(result){
			$scope.backToNewsList();
		});
		promise.catch(function(data){
			alert('You must enter title.');
		 });
	}
});

cmsApp.controller('newsEditCtrl', function($scope, CMSHangookdoService, $window, $routeParams, $modal) {
	
	$scope.toolbar = toolbar;
	
	$scope.heading = "Update News";
	
	// Initialise news data
	$scope.promise = CMSHangookdoService.getNews($routeParams.id);
	
	$scope.promise.then(function(result){
		$scope.formData = result;
	});
	$scope.promise.catch(function(data){
		 alert(data);
	 });
	
	$scope.backToNewsList = function(){
		$window.location.href = 'cms';
	}
	
	$scope.submit = function(){
		var promise = CMSHangookdoService.updateNews($scope.formData);
		
		promise.then(function(result){
			$scope.backToNewsList();
		});
		promise.catch(function(data){
			alert('You must enter title.');
		 });
	}
	
	$scope.selectTitlePhoto = function(){
		
		//in the launch function
    	var modalInstance = $modal.open({
    	      templateUrl: 'selectTitlePhoto.html',
    	      controller: ['$scope', 'CMSHangookdoService', function ($scope, CMSHangookdoService ) {
    	    		$scope.photos = null;
    	    		$scope.numberOfPhotos = null;
    	    		$scope.loadingDone = false;
    	    		
    	    		// Count list images 
    	    		$scope.promiseImagesCounts = CMSHangookdoService.countImages();
    	    		$scope.promiseImagesCounts.then(function(result){
    	    			$scope.numberOfPhotos = result.number;
    	    		});
    	    		
    	    		// Load list images 
    	    		$scope.promiseImages = CMSHangookdoService.getImages({sort: 'createdAt DESC', skip: 0, limit: 12});
    	    		$scope.promiseImages.then(function(result){
    	    			$scope.loadingDone = true;
    	    			$scope.photos = result;
    	    		});
    	    		
    	    		
    	    		
    	    	}],
    	      backdrop: false
    	    });
    	
    	
    	 modalInstance.result.then(function (imageLink) {
    	  });
	}
	
});

cmsApp.controller('galleryCtrl', ['$scope', 'CMSHangookdoService', function ($scope, CMSHangookdoService ) {
	
	
	$scope.photos = null;
	
	// Initialise news data
	$scope.promise = CMSHangookdoService.getImages({sort: 'createdAt DESC'});
	$scope.promise.then(function(result){
		$scope.photos = result;
	});
	
	$scope.files = null;
	$scope.fileCounter = 0;
	
	$scope.$watch('files', function () {
	    $scope.upload($scope.files);
	});
	
	$scope.$watch('fileCounter', function () {
	    if($scope.files){
	    	if($scope.files.length == $scope.fileCounter){
	    		alert("Photo upload completed");
	    	}
	    }
	});
	
	$scope.upload = function (files) {
		$scope.fileCounter = 0;
	    if (files && files.length) {
	        for (var i = 0; i < files.length; i++) {
	            var file = files[i];
	            
	            $scope.uploadPromise = CMSHangookdoService.uploadImage(file);
	            $scope.uploadPromise.then(function(result){
	            	$scope.fileCounter++;
	        	});
	        }
	    }
	};
}]);
    

cmsApp.controller('CMSNavCtrl', function($scope, $location) {
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});

cmsApp.service('CMSHangookdoService', function($q, $http, $upload) {
	
	var _newsList = function() {
		var deferred = $q.defer();
		
		$http({
			url: 'news',
			method: 'GET',
			params: {sort: 'createdAt DESC'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var _getNews = function(id) {
		var deferred = $q.defer();
		
		$http({
			url: 'news',
			method: 'GET',
			params: {id: id}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var _createNews = function(newsItem) {
		var deferred = $q.defer();
		
		$http({
			url: 'news',
			method: 'POST',
			data: $.param(newsItem),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var _updateNews = function(newsItem) {
		var deferred = $q.defer();
		
		$http({
			url: 'news/' + newsItem.id,
			method: 'PUT',
			data: $.param(newsItem),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var _deleteNews = function(id) {
		var deferred = $q.defer();
		
		$http({
			url: 'news/' + id,
			method: 'DELETE'
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var _getImages = function(params) {
		var deferred = $q.defer();
		
		$http({
			url: 'photo',
			method: 'GET',
			params: params
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			deferred.reject();
		});
		
		return deferred.promise;
	};
	
	var _uploadImage = function(file) {
		
		var deferred = $q.defer();
		
		$upload.upload({
            url: 'photo/upload',
            header: {enctype:"multipart/form-data"},
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
        	deferred.resolve(data);
        });
		
		return deferred.promise;
	};
	
	var _countImages = function() {
		var deferred = $q.defer();
		
		$http({
			url: 'photo/count',
			method: 'GET'
		})
		.success(function(data, status, headers, config){
			deferred.resolve(data);
		})
		.error(function(data, status, headers, config){
			deferred.reject();
		});
		
		return deferred.promise;
	};

	return {
		newsList : _newsList,
		getNews: _getNews,
		createNews: _createNews,
		updateNews: _updateNews,
		deleteNews: _deleteNews,
		getImages: _getImages,
		uploadImage: _uploadImage,
		countImages: _countImages
	};
});

cmsApp.factory('AuthInterceptor', function($q, $injector, $window) {
    var LocalService = $injector.get('LocalService');

    return {
      request: function(config) {
        var token;
        if (LocalService.get('hangookdo_auth_token')) {
          token = angular.fromJson(LocalService.get('hangookdo_auth_token')).token;
        }
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          LocalService.unset('hangookdo_auth_token');
//          $injector.get('$state').go('anon.login');
          
          $window.location.href = $window.location.origin + "/#/login";
          
        }
        return $q.reject(response);
      }
    }
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });


cmsApp.factory('LocalService', function() {
	return {
		get : function(key) {
			return localStorage.getItem(key);
		},
		set : function(key, val) {
			return localStorage.setItem(key, val);
		},
		unset : function(key) {
			return localStorage.removeItem(key);
		}
	}
});






cmsApp.config(function($provide){
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$modal', '$window', function(taRegisterTool, taOptions, $modal, $window){
    	
        // $delegate is the taOptions we are decorating
        // register the tool with textAngular
        taRegisterTool('colourRed', {
            iconclass: "fa fa-square red",
            action: function(){
                this.$editor().wrapSelection('forecolor', 'red');
            }
        });
        // add the button to the default toolbar definition
        taOptions.toolbar[1].push('colourRed');
        
        taRegisterTool('insertGalleryImage', {
    		iconclass: 'fa fa-picture-o',
    		tooltiptext: 'Insert gallery image',
    		action: function($deferred){
    			
    			var textAngular = this;
    			var savedSelection = rangy.saveSelection();
    			
    			//in the launch function
		    	var modalInstance = $modal.open({
		    	      templateUrl: 'templates/imageuploadmodal.html',
		    	      controller: 'ImageUploadModalCtrl',
		    	      backdrop: false
		    	    });
		    	
		    	
		    	 modalInstance.result.then(function (imageLink) {
		    		 if(imageLink && imageLink !== '' && imageLink !== 'http://'){
		    			 	rangy.restoreSelection(savedSelection);
		    				textAngular.$editor().wrapSelection('insertImage', imageLink, true);
		    				$deferred.resolve();
		    			}
		    	  });
    		    	
		    	 return false;
    			
    			
//    			this.$editor().$parent.launch('insertImage', $deferred.resolve, this.$editor().wrapSelection);
    			
//    			var imageLink;
//    			imageLink = $window.prompt(taTranslations.insertImage.dialogPrompt, 'http://');
//    			
//    			if(imageLink && imageLink !== '' && imageLink !== 'http://'){
//    				return this.$editor().wrapSelection('insertImage', imageLink, true);
//    			}
    			
    		},
    		onElementSelect: {
    			element: 'img',
    			action: imgOnSelectAction
    		}
    	});
    	
        // add the button to the default toolbar definition
        taOptions.toolbar[1].push('insertGalleryImage');
        
        return taOptions;
    }]);
});

cmsApp.controller('ImageUploadModalCtrl', function($scope, $modalInstance, CMSHangookdoService) {

	$scope.imageFile =null;
	$scope.disableUploadBtn = false;
	
	$scope.imageFileNull = function(){
		  if($scope.imageFile == null){
			  return true;
		  } 
		  return false;
	}
	
	$scope.upload = function () {
		$scope.disableUploadBtn = true;
		$scope.uploadPromise = CMSHangookdoService.uploadImage($scope.imageFile);
		
		$scope.uploadPromise.then(function(result){
			$scope.disableUploadBtn = false;
			$modalInstance.close(result.data.url);
       	});
	};

	$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
	};
});


var imgOnSelectAction = function(event, $element, editorScope){
	// setup the editor toolbar
	// Credit to the work at http://hackerwins.github.io/summernote/ for this editbar logic/display
	var finishEdit = function(){
		editorScope.updateTaBindtaTextElement();
		editorScope.hidePopover();
	};
	event.preventDefault();
	editorScope.displayElements.popover.css('width', '375px');
	var container = editorScope.displayElements.popoverContainer;
	container.empty();
	var buttonGroup = angular.element('<div class="btn-group" style="padding-right: 6px;">');
	var fullButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');
	fullButton.on('click', function(event){
		event.preventDefault();
		$element.css({
			'width': '100%',
			'height': ''
		});
		finishEdit();
	});
	var halfButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');
	halfButton.on('click', function(event){
		event.preventDefault();
		$element.css({
			'width': '50%',
			'height': ''
		});
		finishEdit();
	});
	var quartButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');
	quartButton.on('click', function(event){
		event.preventDefault();
		$element.css({
			'width': '25%',
			'height': ''
		});
		finishEdit();
	});
	var resetButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');
	resetButton.on('click', function(event){
		event.preventDefault();
		$element.css({
			width: '',
			height: ''
		});
		finishEdit();
	});
	buttonGroup.append(fullButton);
	buttonGroup.append(halfButton);
	buttonGroup.append(quartButton);
	buttonGroup.append(resetButton);
	container.append(buttonGroup);
	
	buttonGroup = angular.element('<div class="btn-group" style="padding-right: 6px;">');
	var floatLeft = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');
	floatLeft.on('click', function(event){
		event.preventDefault();
		// webkit
		$element.css('float', 'left');
		// firefox
		$element.css('cssFloat', 'left');
		// IE < 8
		$element.css('styleFloat', 'left');
		finishEdit();
	});
	var floatRight = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');
	floatRight.on('click', function(event){
		event.preventDefault();
		// webkit
		$element.css('float', 'right');
		// firefox
		$element.css('cssFloat', 'right');
		// IE < 8
		$element.css('styleFloat', 'right');
		finishEdit();
	});
	var floatNone = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');
	floatNone.on('click', function(event){
		event.preventDefault();
		// webkit
		$element.css('float', '');
		// firefox
		$element.css('cssFloat', '');
		// IE < 8
		$element.css('styleFloat', '');
		finishEdit();
	});
	buttonGroup.append(floatLeft);
	buttonGroup.append(floatNone);
	buttonGroup.append(floatRight);
	container.append(buttonGroup);
	
	buttonGroup = angular.element('<div class="btn-group">');
	var remove = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');
	remove.on('click', function(event){
		event.preventDefault();
		$element.remove();
		finishEdit();
	});
	buttonGroup.append(remove);
	container.append(buttonGroup);
	
	editorScope.showPopover($element);
	editorScope.showResizeOverlay($element);
};