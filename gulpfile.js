/*
gulp.task - Define tasks
gulp.src - Point to the files to be used
gulp.dest - Point to the folder to output
gulp.watch - Watch Files and folders for changes
*/

const gulp = require('gulp');
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const concat = require('gulp-concat');

// Logs message
gulp.task('message', function(){
	return console.log('Gulp is running......');
});

// Copy all html files
gulp.task('copyHtml', function(){
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
});

// Optimize Images
gulp.task('imageMin', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

// Minify JS files
gulp.task('minify', function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

// Compile Sass Files
gulp.task('sass', function(){
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
});

// Concatenate JS Files
gulp.task('concat_scripts', function(){
  gulp.src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'concat_scripts']);

gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['concat_scripts']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHtml']);
});