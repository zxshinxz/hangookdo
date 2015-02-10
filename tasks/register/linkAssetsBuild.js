module.exports = function (grunt) {
	grunt.registerTask('linkAssetsBuild', [
		'sails-linker:devJsRelative',
		'sails-linker:devJsRelativeApp',
		'sails-linker:devJsRelativeCMS',
		'sails-linker:devStylesRelative',
		'sails-linker:devTpl',
		'sails-linker:devJsRelativeJade',
		'sails-linker:devStylesRelativeJade',
		'sails-linker:devTplJade'
	]);
};
