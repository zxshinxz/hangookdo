/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

	grunt.config.set('concat', {
		js: {
			src: require('../pipeline').jsFilesToInject,
			dest: '.tmp/public/concat/production.js'
		},
		css: {
			src: require('../pipeline').cssFilesToInject,
			dest: '.tmp/public/concat/production.css'
		},
		app : {
			src : require('../pipeline').jsFilesToInjectForApp,
			dest : '.tmp/public/concat/productionapp.js'
		},
		cms : {
			src : require('../pipeline').jsFilesToInjectForCMS,
			dest : '.tmp/public/concat/productioncms.js'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
