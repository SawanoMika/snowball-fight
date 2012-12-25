module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    uglify:
      options:
        # mangle:
        #   except: ['jQuery', 'Modenrizr', '$']
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      dist:
        files:
          'static/snowball-fight.min.js': ['assets/*.js']
    mincss:
      compress:
        files:
          'static/game.css': ['assets/game.css']
    htmlmin:
      dist:
        options:
          removeComments: true
          collapseWhitespace: true
        files:
          'static/index.html': 'assets/index.html'
    watch:
      js:
        files: ['assets/*.js']
        tasks: ['uglify']
      css:
        files: ['assets/*.css']
        tasks: ['mincss']
      html:
        files: ['assets/*.html']
        tasks: ['htmlmin']

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-mincss'
  grunt.loadNpmTasks 'grunt-contrib-htmlmin'
  grunt.registerTask 'default', ['uglify', 'mincss', 'htmlmin', 'watch']