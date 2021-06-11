const {src, dest} = require('gulp');
const concat = require('gulp-concat');
const order = require('gulp-order');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const fn = function (jsfiles, jsorder, path) {
    return function () {
        return src(jsfiles)
            .pipe(order(jsorder, {base: './'}))
            .pipe(concat("app.js"))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(dest("./dist/js"))
            .pipe(uglify({compress: true}))
            .pipe(dest(path + "js/"));
    }
};

exports.js = fn;
