module.exports = function (grunt) {
  //初始化配置grunt任务
  grunt.initConfig({
    concat: {//任务名
      options:{
        separator:';',
      },
      dist:{
        src:['src/js/*.js'],
        dest:'dist/js/build.js'
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: ['build/js/build.js'],
        dest: 'build/js/build.min.js',
      },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'//指定配置文件
      },
      build: ['Gruntfile.js', 'src/js/*.js']//指定检查的文件
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/css/output.min.css': ['src/css/*.css']
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/js/*.js', 'src/css/*.css'],//监视源文件
        tasks: ['concat', 'jshint', 'uglify', 'cssmin'],//自动执行任务
        options: { spawn: false }//变量更新 true:全量更新（所有任务全部更新）
      }
    }
  });
  //grunt任务执行的时候去加载对应的任务插件
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //注册grunt的默认任务 grunt执行任务是同步的
  grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'cssmin']);
  grunt.registerTask('myWatch',['default','watch']);//先启动default，然后启动watch任务
};