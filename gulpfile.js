var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('transpile', function() {
    gulp.src('src/**/*.js')
        .pipe(babel({
            optional: ['runtime']
        }))
        .pipe(gulp.dest('package'));
});

gulp.task('default', ['transpile']);
