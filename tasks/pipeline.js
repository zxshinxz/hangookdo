/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/**/*.css'
];


//Client-side javascript files to inject in order
//(uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

// Dependencies like sails.io.js, jQuery, or Angular
// are brought in here
//'js/dependencies/sails.io.js',
	'js/dependencies/es5-shim.js',
	'js/dependencies/jquery.js',
	'js/dependencies/angular.js',
	'js/dependencies/js/bootstrap.js',
	'js/dependencies/ui-bootstrap-tpls.js',
	'js/dependencies/TimelineMax.min.js',
	'js/dependencies/TweenMax.min.js',
	'js/dependencies/angular-animate.js',
	'js/dependencies/angular-cookies.js',
	'js/dependencies/angular-resource.js',
	'js/dependencies/angular-route.js',
	'js/dependencies/angular-touch.js',
	'js/dependencies/angular-file-upload.js',
//	'js/dependencies/angular-ui-router.js'
// All of the rest of your client-side js files
// will be injected here in no particular order.
];

//Client-side javascript files to inject in order
//(uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInjectForApp = [
	'js/dependencies/app.js',
	'js/dependencies/cms-main.js',
	'js/dependencies/HangookdoController.js',
	'js/dependencies/HangookdoDirective.js',
	'js/dependencies/HangookdoService.js',
	'js/dependencies/HangookdoAccessLevels.js',
	'js/dependencies/HangookdoAuth.js',
	'js/dependencies/localStorage.js'
];

//Client-side javascript files to inject in order
//(uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInjectForCMS = [
	'js/dependencies/textAngular-rangy.min.js',
	'js/dependencies/textAngular-sanitize.min.js',
	'js/dependencies/textAngular.min.js',
	'js/dependencies/cms-main.js',
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInjectForApp = jsFilesToInjectForApp.map(function(path) {
	  return '.tmp/public/' + path;
});
module.exports.jsFilesToInjectForCMS = jsFilesToInjectForCMS.map(function(path) {
	  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
