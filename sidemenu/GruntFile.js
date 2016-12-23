module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: ['temp']
		},
        concat: {
            options: {
                seperator: "\n\n",
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
            },
            dist: {
                src: ['temp/**/*.annotated.js'],
                dest: 'dist/<%= pkg.name %>.js'
            },
            deps: {
                src: [
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-aria/angular-aria.min.js',
                    'bower_components/angular-messages/angular-messages.min.js',
                    'bower_components/angular-material/angular-material.min.js'
                ],
                dest: 'dist/<%= pkg.name %>-dep.js'
            },
            css: {
                src: ['bower_components/**/*.min.css', 
                    'src/resources/css/styles.css' ],
                dest: 'dist/<%= pkg.name %>.css'
            }
        },
        jshint: {
            SideMenu: ['src/**/**.js']
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
                add: true,
                remove: true
            },
            SideMenu: {
                files: [{
                        expand: true,
                        cwd: 'src/resources/js/',
                        src: ['*.js','!**/*.annotated.js'],
                        falltern: true,
                        dest: 'temp',
                        ext: '.annotated.js', // Dest filepaths will have this extension.
                        extDot: 'last'       // Extensions in filenames begin after the last dot
                },
                {
                        expand: true,
                        cwd: 'temp',
                        src: ['*.js','!**/*.annotated.js'],
                        falltern: true,
                        dest: 'temp',
                        ext: '.annotated.js', // Dest filepaths will have this extension.
                        extDot: 'last'       // Extensions in filenames begin after the last dot
                }]
            }
        },
        ngtemplates:  {
            options: {
                htmlmin:  { 
                    collapseWhitespace: true, 
                    collapseBooleanAttributes: true 
                }
            },
            SideMenu: {
                cwd: 'src',
                src: 'templates/**/*.html',
                dest: 'temp/templates.js'
            }
        },
        uglify: {
            options:{
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'           
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>-min.js': 'dist/<%= pkg.name %>.js'
                }
            }
        },
        sass: {
            dev: {
                files: {
                    'src/resources/css/styles.css': 'src/resources/css/styles.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/resources/js/**/*.js'],
                tasks: ['ngtemplates','ngAnnotate','concat','uglify']
            },
            styles: {
                files: ['src/resources/css/*.css'],
                tasks: ['concat:css']
            }
        }
    });

	//npm tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-ng-annotate'); 
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');

	//tasks
	grunt.registerTask('default', 'Default Task Alias', 
        ['build']);

	grunt.registerTask('build', 'Build the application', 
		[
			'clean',
            'ngtemplates',
            'jshint',
            'ngAnnotate',
		    'concat',
            'uglify'
		]);
}