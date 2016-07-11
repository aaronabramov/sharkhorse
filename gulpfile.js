var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('transpile', function() {
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: [
                ['transform-runtime', {
                    polyfill: false,
                    regenerator: true
                }]
            ]
        }))
        .pipe(gulp.dest('package'));
});

gulp.task('default', ['transpile']);
