

var hangookdoApp = angular.module('hangookdoApp', [  'ngTouch', 'ngAnimate','ngCookies', 'ngResource',
		'ngSanitize','angularFileUpload','ui.bootstrap', 'ngRoute']);

hangookdoApp.config(function($routeProvider, AccessLevels) {
	
//	$urlRouterProvider.otherwise('/');
//
//	$stateProvider
//	.state('anon', {
//		abstract: true,
//		template: '<ui-view/>',
//		data: {
//			access: AccessLevels.anon
//		}
//	})
//	.state('anon.home', {
//		url: '/',
//		templateUrl: 'templates/main.html',
//		controller : 'MainCtrl'
//	})
//	.state('anon.about', {
//		url: '/about',
//		templateUrl: 'templates/about.html',
//		controller : 'AboutCtrl'
//	})
//	.state('anon.contact', {
//		url: '/contact',
//		templateUrl: 'templates/contact.html',
//		controller : 'ContactCtrl'
//	})
//	.state('anon.links', {
//		url: '/links',
//		templateUrl: 'templates/links.html',
//		controller : 'LinksCtrl'
//	})
//	.state('anon.membership', {
//		url: '/membership',
//		templateUrl: 'templates/contact.html',
//		controller : 'MembershipCtrl'
//	})
//	.state('anon.login', {
//		url: '/login',
//		templateUrl: 'templates/contact.html',
//		controller : 'LoginCtrl'
//	})
//	.state('anon.register', {
//		url: '/register',
//		templateUrl: 'templates/register.html',
//		controller : 'RegisterCtrl'
//	})
//	.state('anon.activate', {
//		url: '/activate',
//		templateUrl: 'templates/activate.html',
//		controller : 'ActivateCtrl'
//	})
//	.state('anon.active', {
//		url: '/active',
//		templateUrl: 'templates/active.html',
//		controller : 'ActiveCtrl'
//	})
//	.state('anon.lostpassword', {
//		url: '/lostpassword',
//		templateUrl: 'templates/lostpassword.html',
//		controller : 'LostPasswordCtrl'
//	})
//	.state('anon.reset', {
//		url: '/reset',
//		templateUrl: 'templates/reset.html',
//		controller : 'ResetCtrl'
//	})
//	.state('anon.invalid', {
//		url: '/invalid',
//		templateUrl: 'templates/invalid.html',
//		controller : 'InvalidCtrl'
//	})
//	.state('anon.news1', {
//		url: '/login',
//		templateUrl: 'templates/website.html'
//	})
//	.state('anon.news2', {
//		url: '/login',
//		templateUrl: 'templates/tshirt.html'
//	})
//	.state('anon.news3', {
//		url: '/login',
//		templateUrl: 'templates/grading.html'
//	});
	
	$routeProvider
	.when('/', {
		templateUrl : 'templates/main.html',
		controller : 'MainCtrl'
	}).when('/about', {
		templateUrl : 'templates/about.html',
		controller : 'AboutCtrl'
	}).when('/contact', {
		templateUrl : 'templates/contact.html',
		controller : 'ContactCtrl'
	}).when('/links', {
		templateUrl : 'templates/links.html',
		controller : 'LinksCtrl'
	}).when('/membership', {
		templateUrl : 'templates/membership.html',
		controller : 'MembershipCtrl'
	}).when('/login', {
		templateUrl : 'templates/login.html',
		controller : 'LoginCtrl'
	}).when('/register', {
		templateUrl : 'templates/register.html',
		controller : 'RegisterCtrl'
	}).when('/activate', {
		templateUrl : 'templates/activate.html',
		controller : 'ActivateCtrl'
	}).when('/active', {
		templateUrl : 'templates/active.html',
		controller : 'ActiveCtrl'
	}).when('/lostpassword', {
		templateUrl : 'templates/lostpassword.html',
		controller : 'LostPasswordCtrl'
	}).when('/reset', {
		templateUrl : 'templates/reset.html',
		controller : 'ResetCtrl'
	}).when('/invalid', {
		templateUrl : 'templates/invalid.html',
		controller : 'InvalidCtrl'
	}).when('/news1', {
		templateUrl : 'templates/website.html'
	}).when('/news2', {
		templateUrl : 'templates/tshirt.html'
	}).when('/news3', {
		templateUrl : 'templates/grading.html'
	});
});
                                                       

