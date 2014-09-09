(function() {
	"use strict";
	var dynamicPath, path, stripMin;

	path = require("path");

	dynamicPath = function(dest, src) {
		var srcParts;
		srcParts = src.split('/');
		src = src.replace(path.join(srcParts[0], srcParts[1]), "");
		dest = dest.replace("[project]", srcParts[0]);
		return path.join(dest, src);
	};

	stripMin = function(dest, src) {
		src = src.replace(/\.min\.js$/, ".js");
		console.log(dest + src);
		return dest + src;
	};
  
	module.exports = function(grunt) {
		
		var appConfig, env, project;
		env = process.env;
		project = {
		  path: path.resolve(process.cwd(), "../../../")
		};
		project.basename = path.basename(project.path);
		require("load-grunt-tasks")(grunt);
		require("time-grunt")(grunt);
		
		appConfig = {
		  dev: "../source/",
		  dist: "../app/progress_bars/assets/",
		  bower: "bower_components"
		};
		// Project configuration.
		grunt.initConfig({
			paths: appConfig,
			watch: {
				js: {
				  files: ["<%= paths.dev %>/*/js/**/*.js"],
				  tasks: ["prepareConact"]
				},				
				compass: {
				  files: ["<%= paths.dev %>/*/scss/**/*.{scss,sass}"],
				  tasks: ["prepareCompass"]
				},
				css: {
				  files: ["<%= paths.dev %>/*/css/**/*.css"],
				  tasks: ["copy:css"]
				}
			},
			//Read the package.json (optional)
			pkg: grunt.file.readJSON('package.json'),

			// Metadata.
			meta: {
				basePath: '../',
				srcPath: '../source/',
				deployPath: '../app/progress_bars/assets/'
			},

			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
					'* Copyright (c) <%= grunt.template.today("yyyy") %> ',

			concat: {
				css: {
				   src: [
						 '<%= meta.srcPath %>css/*'
						],
					dest: '<%= meta.deployPath %>css/publish.css'
				},
				js : {
					src : [
						'<%= meta.srcPath %>js/*'
					],
					dest : '<%= meta.deployPath %>js/publish.js'
				}
			},
				
			// grunt-minified minification			
			minified : {
			  files: {
				src: [
				'<%= meta.srcPath %>js/**/*.js'
				],
				dest: '<%= meta.deployPath %>js/publish.min.js'
			  },
			  options : {
				sourcemap: true,
				allinone: true
			  }
			},
			
			// cssmin minification
			cssmin: {
				css: {
				   src: [
						 '<%= meta.srcPath %>css/*'
						],
					dest: '<%= meta.deployPath %>css/publish.min.css'
				},
				js : {
					src : [
						'<%= meta.srcPath %>js/*'
					],
					dest : '<%= meta.deployPath %>js/publish.min.js'
				}
			},
			
			// uglify minification
			uglify: {
			  options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			  },
			  build: {
				src:  '<%= meta.deployPath %>js/publish.js',
				dest: '<%= meta.deployPath %>js/publish.min.js'
			  }
			}
			
		});

		// Core Build Tasks
		grunt.loadNpmTasks('grunt-contrib-concat');		
		grunt.loadNpmTasks('grunt-minified');				
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		
		 grunt.registerTask("prepareCompass", "Iterates over project directories and configures compass", function() {
		  grunt.file.expand("../source/*").forEach(function(projectPath) {
			var compass, projectName;
			projectName = path.basename(projectPath);
			compass = grunt.config.get("compass") || {};
			compass[projectName] = {
			  options: {
				sassDir: "" + projectPath + "/scss/",
				cssDir: "" + projectPath + "/css/",
				relativeAssets: true,
				imagesDir: "" + projectPath + "/images/",
				javascriptsDir: "" + projectPath + "/js/",				
				importPath: appConfig.bower,
				outputStyle: "compressed",
				debugInfo: false
			  }
			};
			return grunt.config.set("compass", compass);
		  });
		  return grunt.task.run("compass");
		});
		
		grunt.registerTask("prepareConact", "Iterates over project directories and configures concat", function() {
		  grunt.file.expand("../source/**/package.json").forEach(function(packagePath) {
			var concat, i, name, packageConf, packagePathParts, projectPath, srcPath, _i, _len, _ref;
			packagePathParts = packagePath.split(path.sep);
			packageConf = grunt.file.readJSON(packagePath);
			projectPath = path.join(packagePathParts[0], packagePathParts[1]);
			name = path.basename(packageConf.dest, ".js");
			concat = grunt.config.get("concat") || {};
			_ref = packageConf.src;
			for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
			  srcPath = _ref[i];
			  packageConf.src[i] = path.join(projectPath, packageConf.cwd, srcPath);
			}
			packageConf.dest = path.join(projectPath, packageConf.cwd, packageConf.dest);
			concat[name] = {
			  options: {
				sourceMap: false
			  },
			  src: packageConf.src,
			  dest: packageConf.dest
			};
			return grunt.config.set("concat", concat);
		  });
		  return grunt.task.run("concat");
		});
		grunt.registerTask('default', [ 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js' ]);
	};

}).call(this);