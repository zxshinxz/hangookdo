/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 * 		https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(grunt) {

	grunt.config.set('sails-linker', {
		devJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': [require('../pipeline').jsFilesToInject],
				'views/**/*.html': [require('../pipeline').jsFilesToInject],
				'views/**/*.ejs': [require('../pipeline').jsFilesToInject]
			}
		},
		devJsApp: {
			options: {
				startTag: '<!--APPSCRIPTS-->',
				endTag: '<!--APPSCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': [require('../pipeline').jsFilesToInjectForApp],
				'views/**/*.html': [require('../pipeline').jsFilesToInjectForApp],
				'views/**/*.ejs': [require('../pipeline').jsFilesToInjectForApp]
			}
		},
		devJsCMS: {
			options: {
				startTag: '<!--CMSSCRIPTS-->',
				endTag: '<!--CMSSCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': [require('../pipeline').jsFilesToInjectForCMS],
				'views/**/*.html': [require('../pipeline').jsFilesToInjectForCMS],
				'views/**/*.ejs': [require('../pipeline').jsFilesToInjectForCMS]
			}
		},

		devJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': [require('../pipeline').jsFilesToInject],
				'views/**/*.html': [require('../pipeline').jsFilesToInject],
				'views/**/*.ejs': [require('../pipeline').jsFilesToInject]
			}
		},
		
		devJsRelativeApp: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': [require('../pipeline').jsFilesToInjectForApp],
				'views/**/*.html': [require('../pipeline').jsFilesToInjectForApp],
				'views/**/*.ejs': [require('../pipeline').jsFilesToInjectForApp]
			}
		},
		
		devJsRelativeCMS: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': [require('../pipeline').jsFilesToInjectForCMS],
				'views/**/*.html': [require('../pipeline').jsFilesToInjectForCMS],
				'views/**/*.ejs': [require('../pipeline').jsFilesToInjectForCMS]
			}
		},
		
		prodJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.js']
			}
		},
		
		prodJsApp: {
			options: {
				startTag: '<!--APPSCRIPTS-->',
				endTag: '<!--APPSCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/productionapp.min.js'],
				'views/**/*.html': ['.tmp/public/min/productionapp.min.js'],
				'views/**/*.ejs': ['.tmp/public/min/productionapp.min.js']
			}
		},
		
		prodJsCMS: {
			options: {
				startTag: '<!--CMSSCRIPTS-->',
				endTag: '<!--CMSSCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/productioncms.min.js'],
				'views/**/*.html': ['.tmp/public/min/productioncms.min.js'],
				'views/**/*.ejs': ['.tmp/public/min/productioncms.min.js']
			}
		},

		prodJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.html': ['.tmp/public/min/production.min.js'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.js']
			}
		},
		
		prodJsRelativeApp: {
			options: {
				startTag: '<!--APPSCRIPTS-->',
				endTag: '<!--APPSCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/productionapp.min.js'],
				'views/**/*.html': ['.tmp/public/min/productionapp.min.js'],
				'views/**/*.ejs': ['.tmp/public/min/productionapp.min.js']
			}
		},
		
		prodJsRelativeCMS: {
			options: {
				startTag: '<!--CMSSCRIPTS-->',
				endTag: '<!--CMSSCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/productioncms.min.js'],
				'views/**/*.html': ['.tmp/public/min/productioncms.min.js'],
				'views/**/*.ejs': ['.tmp/public/min/productioncms.min.js']
			}
		},

		devStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: '.tmp/public'
			},

			files: {
				'.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
				'views/**/*.html': require('../pipeline').cssFilesToInject,
				'views/**/*.ejs': require('../pipeline').cssFilesToInject
			}
		},

		devStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
				'.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
				'views/**/*.html': require('../pipeline').cssFilesToInject,
				'views/**/*.ejs': require('../pipeline').cssFilesToInject
			}
		},

		prodStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.css']
			}
		},

		prodStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.html': ['.tmp/public/min/production.min.css'],
				'views/**/*.ejs': ['.tmp/public/min/production.min.css']
			}
		},

		// Bring in JST template object
		devTpl: {
			options: {
				startTag: '<!--TEMPLATES-->',
				endTag: '<!--TEMPLATES END-->',
				fileTmpl: '<script type="text/javascript" src="%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/jst.js'],
				'views/**/*.html': ['.tmp/public/jst.js'],
				'views/**/*.ejs': ['.tmp/public/jst.js']
			}
		},

		devJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': [require('../pipeline').jsFilesToInject, require('../pipeline').jsFilesToInjectForApp]
			}
		},

		devJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': [require('../pipeline').jsFilesToInject, require('../pipeline').jsFilesToInjectForApp]
			}
		},

		prodJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.js']
			}
		},

		prodJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.js']
			}
		},

		devStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public'
			},

			files: {
				'views/**/*.jade': require('../pipeline').cssFilesToInject
			}
		},

		devStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
				'views/**/*.jade': require('../pipeline').cssFilesToInject
			}
		},

		prodStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.css']
			}
		},

		prodStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.min.css']
			}
		},

		// Bring in JST template object
		devTplJade: {
			options: {
				startTag: '// TEMPLATES',
				endTag: '// TEMPLATES END',
				fileTmpl: 'script(type="text/javascript", src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/jst.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sails-linker');
};
