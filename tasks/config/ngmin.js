/**
 * 
 */

/**
 * Concatenate files.
 * 
 * ---------------------------------------------------------------
 * 
 * Concatenates files javascript and css from a defined array. Creates
 * concatenated files in public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 * 
 * For usage docs see: https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

	grunt.config.set('ngmin', {
		app : {
			src : '.tmp/public/concat/productionapp.js',
			dest : '.tmp/public/concat/productionapp.js'
		},
		cms : {
			src : '.tmp/public/concat/productioncms.js',
			dest : '.tmp/public/concat/productioncms.js'
		}
	
	});

	grunt.loadNpmTasks('grunt-ngmin');
};
