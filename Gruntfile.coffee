module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    uglify:
      options:
        # mangle: false
        mangle: true
        compress: false
        # beautify: true
        beautify: false
        #   except: ['jQuery', 'Modenrizr', '$']
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      dist:
        files:
          'static/snowball-fight.min.js': ['assets/*.js']
    cssmin:
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
          'static/unsupport.html': 'assets/unsupport.html'
    watch:
      js:
        files: ['assets/CheckBrowser.js', 'assets/html5_game_lib.js', 'assets/StageMap.js', 'assets/SnowballFight.js', 'assets/Widget.js','assets/Item.js', 'assets/Sprite.js','assets/AI.js', 'assets/Score.js', 'assets/server.js']
        tasks: ['uglify']
      css:
        files: ['assets/*.css']
        tasks: ['cssmin']
      html:
        files: ['assets/*.html']
        tasks: ['htmlmin']

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-htmlmin'
  grunt.registerTask 'default', ['htmlmin', 'cssmin', 'uglify', 'watch']