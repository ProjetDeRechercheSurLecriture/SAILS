'use strict';

module.exports = function(grunt) {

  var montageMobileWebViewsRoot = "../CordovaChromeSailsWrapper";
  // Project configuration.
  grunt.initConfig({
    tests: {
      files: ['test/**/*_test.js'],
    },
    exec: {
      echo_help: {
        cmd: function() {
          return 'echo " "';
        }
      },
      build_codebase_for_production: {
        cmd: function() {
          // return 'cd node_modules/popcorn && mop && cd ../../node_modules/paparazzi && mop && cd ../../node_modules/calculator && mop && cd ../../node_modules/photofx && mop && cd ../../node_modules/card && mop && cd ../../node_modules/storyboard && mop ';
          return './scripts/copy_cordova_instead.sh';
        }
      },
      android_debug: {
        cmd: function() {
          return 'cd ' + montageMobileWebViewsRoot + ' && cca prepare && cca run android';
        }
      },
      android_build: {
        cmd: function() {
          return 'cd ' + montageMobileWebViewsRoot + '/platforms/android && ant clean debug install';
        }
      },
      android_test: {
        cmd: function() {
          return 'cd ' + montageMobileWebViewsRoot + ' && android update project -p ./platforms/android && cd platforms/android && ant clean debug install';
        }
      },
      android_debug_webview: {
        cmd: function() {
          return 'ls android-server-2.32.0.apk || { curl -O --retry 999 --retry-max-time 0 -C -  https://selenium.googlecode.com/files/android-server-2.32.0.apk; } && adb install android-server-2.32.0.apk || { echo "Already installed"; } && adb  shell am start -a android.intent.action.MAIN -n org.openqa.selenium.android.app/.MainActivity -e debug true && adb  forward tcp:8080 tcp:8080 || { echo "Webdriver already started and bound to socket"; } ';
        }
      },
      ios_debug: {
        cmd: function() {
          return 'cd ' + montageMobileWebViewsRoot + ' && cca prepare && cca emulate ios ';
        }
      },
      ios_test: {
        cmd: function() {
          return 'echo "There are no tests set up for the iOS platform" ';
        }
      },
      /* https://code.google.com/p/selenium/wiki/AndroidDriver */
      selenium_test: {
        cmd: function() {
          return 'echo "TODO now we can run javascript tests in the Android WebView by contacting http://localhost:8080/wd/hub" ';
        }
      }, 
      cordova_js_test: {
        cmd: function() {
          return 'cd ' + montageMobileWebViewsRoot + ' &&  mkdir deps || echo "" ; cd deps ;  git clone https://github.com/apache/cordova-mobile-spec.git || echo "" ;  cordova platform add ios android ; cordova plugin add ../cordova-mobile-spec/dependencies-plugin ; rm -r www ; ln -s ../cordova-mobile-spec www ; cordova platform add android ; cordova run android ; ';
        }
      }, 
      cordova_android_debug: {
        cmd: function() {
          return 'cd ' + montageMobileWebViewsRoot + ' && mkdir deps || echo "" ; cd deps ; git clone https://github.com/apache/cordova-android.git || echo "" ; cd cordova-android/framework ; android update project -p . -t android-18 --subprojects ; ant debug install  ; ant jar ; cd ../test && mkdir libs ||  echo ""  ; cp ../framework/cordova* libs/ ; android update project -p . -t android-18 --subprojects ; ant debug install ; adb shell am instrument -w org.apache.cordova.test/android.test.InstrumentationTestRunner ';
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      codebase: {
        src: 'ui/**/*.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['jshint', 'exec:echo_help']);

  // Warning calling update will download all the latest codebase and build them into the app, replacing any previous codebase
  grunt.registerTask('update', ['jshint', 'exec:build_codebase_for_production', 'copy:codebase']);

  // Build and debug/test on devices
  grunt.registerTask('android', ['jshint', 'exec:android']);
  grunt.registerTask('ios', ['jshint', 'exec:ios']);

  // Run tests on emulators/devices using travis/jenkins
  grunt.registerTask('debug-android', ['jshint', 'exec:build_codebase_for_production', 'exec:android_debug']);
  grunt.registerTask('debug-ios', ['jshint', 'exec:build_codebase_for_production', 'exec:ios_debug']);
  grunt.registerTask('debug', ['exec:android_debug', 'exec:ios_debug']);

  // Run everything to set up a new machine or continuous integration tests for travis/jenkins
  grunt.registerTask('everything', [ 'exec:build_codebase_for_production', 'debug-android', 'exec:android_debug_webview', 'exec:selenium_test']);
  // grunt.registerTask('ci-test', ['update', 'exec:android_build', 'test']);
};
