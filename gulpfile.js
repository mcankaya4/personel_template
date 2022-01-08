const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')

gulp.task('browser-sync', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./scss/**/*.scss', gulp.series('css'))
    gulp.watch("./js/*.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
})

gulp.task('css', () => {
    return gulp.src('./scss/main.scss')
        .pipe(plumber([{ errorHandler: false }]))
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
})

gulp.task('default', gulp.series('browser-sync', 'css'))