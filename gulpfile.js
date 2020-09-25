var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

// var series = require('stream-series');

var spritesmith = require('gulp.spritesmith');
var wiredep = require('wiredep').stream;

gulp.task('styles', function() {
  var injectAppFiles = gulp.src(['assets/styles/*.scss', '!assets/styles/main.scss', '!assets/styles/icons.scss'], { read: false });
  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  
  return gulp.src('assets/styles/main.scss')
    .pipe(wiredep())
    .pipe($.inject(injectAppFiles, injectAppOptions))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('sprite', function() {
  // Generate our spritesheet
  var spriteData = gulp.src('assets/images/icons/*.png').pipe(spritesmith({
    retinaSrcFilter: 'assets/images/icons/*@2x.png',
    retinaImgName: 'sprite@2x.png',
    retinaImgPath: './sprite@2x.png',
    imgName: 'sprite.png',
    cssName: 'icons.scss',
    imgPath: './sprite.png',
    padding: 5,
    cssVarMap: function(sprite) {
      sprite.name = 'g-icon_' + sprite.name;
    }
  }));

  var imgStream = spriteData.img
    .pipe($.buffer())
    .pipe(gulp.dest('assets/dist/'));
  // Todo image min

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest('assets/styles/'));

  // Return a merged stream to handle both `end` events
  return $.merge(imgStream, cssStream);
});

gulp.task('clean', function() {
  return $.del(['assets/dist']);
});


gulp.task('watch', function() {
  gulp.watch('assets/styles/*.scss', ['styles']);
});

gulp.task('build', ['clean', 'sprite', 'styles']);
gulp.task('deploy', ['build']);
gulp.task('default', ['build', 'watch']);
