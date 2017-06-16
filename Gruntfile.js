/* eslint-env es6, eslint-disable no-var, prefer-arrow-callback */
'use strict';

module.exports = function(grunt) {
    const sUser = grunt.option("user");
    const sPwd = grunt.option("pwd");

    grunt.initConfig({

        dir: {
            webapp: 'webapp',
            dist: 'dist',
            bower_components: 'bower_components'
        },

        connect: {
            options: {
                port: 8888,
                hostname: '*'
            },
            src: {},
            dist: {}
        },

        openui5_connect: {
            options: {
                resources: [
                    '<%= dir.bower_components %>/openui5-sap.ui.core/resources',
                    '<%= dir.bower_components %>/openui5-sap.m/resources',
                    '<%= dir.bower_components %>/openui5-sap.ui.layout/resources',
                    '<%= dir.bower_components %>/openui5-themelib_sap_belize/resources'
                ]
            },
            src: {
                options: {
                    appresources: '<%= dir.webapp %>'
                }
            },
            dist: {
                options: {
                    appresources: '<%= dir.dist %>'
                }
            }
        },

        openui5_preload: {
            component: {
                options: {
                    resources: {
                        cwd: '<%= dir.webapp %>',
                        prefix: 'todo'
                    },
                    dest: '<%= dir.dist %>'
                },
                components: true
            }
        },

        nwabap_ui5uploader: {
            options: {
                conn: {
                    server: 'http://vhcalnplci.dummy.nodomain:8000',
                },
                auth: {
                    user: sUser,
                    pwd: sPwd
                }
            },
            upload_build: {
                options: {
                    ui5: {
                        package: 'ZZ_UI5_REPO',
                        bspcontainer: 'ZZ_UI5_TRACKED',
                        bspcontainer_text: 'UI5 upload',
                        transportno: 'NPLK900028'
                    },
                    resources: {
                        cwd: 'dist',
                        src: '**/*.*'
                    }
                }
            }
        },

        clean: {
            dist: '<%= dir.dist %>/'
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.webapp %>',
                    src: [
                        '**'
                    ],
                    dest: '<%= dir.dist %>'
                }]
            }
        },

        eslint: {
            webapp: ['<%= dir.webapp %>']
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-openui5');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks("grunt-zip");
    grunt.loadNpmTasks('grunt-nwabap-ui5uploader');

    // Server task
    grunt.registerTask('serve', function(target) {
        grunt.task.run('openui5_connect:' + (target || 'src') + ':keepalive');
    });

    // Linting task
    grunt.registerTask('lint', ['eslint']);

    // Build task
    grunt.registerTask('build', ['openui5_preload', 'copy']);

    // deploy
    grunt.registerTask('deploy', ['nwabap_ui5uploader']);


    // Default task
    grunt.registerTask('default', [
        'lint',
        'clean',
        'build',
        'serve:dist'
    ]);
};