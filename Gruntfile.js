module.exports = function(grunt) {

	var buildConfig = {
		app: 'app/assets',
		dist: 'public/build'
	};

	grunt.initConfig({
		config:buildConfig,
		pkg: grunt.file.readJSON('package.json'),

		clean: [
			'<%= config.dist %>'
		],
		rev: {
			dist: {
				files: {
					src: [
						'<%= config.dist %>/scripts/main.min.js',
						'<%= config.dist %>/styles/{,*/}*.css'
					]
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					paths:{
						global:'empty:',
						viewcontroller:'empty:',
					},
					preserveLicenseComments: true,
					mainConfigFile: '<%= config.app %>/scripts/config.js',
					name: "app",
					include: ['config'],
					out: '<%= config.dist %>/scripts/main.min.js'
				}
			}
		},
		compass: {
			options: {
				sassDir: '<%= config.app %>/sass',
				cssDir: '<%= config.dist %>/styles',
				imagesDir: '<%= config.app %>/sass/images',
				generatedImagesDir: 'public/assets/images',
				javascriptsDir: '<%= config.app %>/scripts',
				fontsDir: 'public/assets/fonts',
				//importPath: 'components',
				relativeAssets: true
			},
			dist: {
				options:{
					environment:'production',
					outputStyle:'compressed',
					debugInfo:false
				}
			},
			dev: {
				options:{
					environment:'development',
					debugInfo:false
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			js: {
				files: ['<%= config.app %>/scripts/**/*.js'],
				options: {
					nospawn: true
				}
			},
			sass: {
				files: ['<%= config.app %>/sass/**/*.scss'],
				tasks: ['compass:dev'],
				options: {
					nospawn: true
				}
			},
			all:{
				files: ['app/**/*.php'],
				options: {
					nospawn: true,
					livereload: true
				}
			}
		},

		hash_data: {
			files_list: {
				src: [
					'<%= config.dist %>/scripts/main.min.js',
					'<%= config.dist %>/styles/styles.css'
				]
			},
			options: {
				affix: 'prefix',
				separator: '-',
				length: 6,
				algorithm: 'sha1',
				summary: 'summary.json',
				after: function(summary, options) {
					for(var file in summary){
						if(file.indexOf(buildConfig.dist) != 0){
							return;
						}

						var filename = file.substring(file.lastIndexOf('/')+1, file.lastIndexOf('.'));
						var reg = new RegExp("\/([a-z0-9-]+-)("+filename+")");
						var hash = summary[file].hash;

						function replaceInFile(file){
							var f = grunt.file.read(file).toString();
							if(reg.test(f) != false){
								f = f.replace(reg, '/'+hash+'-$2');
								grunt.file.write(file, f);
								grunt.log.writeln('replaced '+filename+' in '+file);
							}
						}
						replaceInFile("app/views/partials/styles.blade.php");
						replaceInFile("app/views/partials/scripts.blade.php");
					}
				}
			}
		},

		uglify: {
			options: {
				//banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				//report: true
			},
			dist: {
				files: [{
					expand:true,
					src:['**/*.js'],
					cwd:'<%= config.dist %>/scripts',
					dest:'<%= config.dist %>/scripts'
				}]
			}
		},

		bower: {
			dev: {
				dest: '<%= config.dist %>',
				js_dest: '<%= config.dist %>/scripts',
				fonts_dest: '<%= compass.options.fontsDir %>',
				options:{
					ignorePackages: ['jquery'],
					expand: false,
					keepExpandedHierarchy: false,
					packageSpecific:{
						"sass-bootstrap" :{
							files: [
								'**/*.svg','**/*.eot','**/*.ttf','**/*.wof','**/*.otf'
							]
						},
						"modernizr" :{
							files: [
								'modernizr.js',
							]
						},
						"respond" :{
							files: [
								'src/respond.js',
							]
						}
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('hash-data');


	grunt.registerTask('default', ['watch']);
	grunt.registerTask('bowercopy', ['bower','uglify']);
	grunt.registerTask('build', ['clean','bowercopy','compass:dist','requirejs','hash_data','compass:dev']);

};