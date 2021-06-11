const {src, dest} = require('gulp');
const concat = require('gulp-concat');

const fn = function (vendorFiles, path) {
    return function () {
        return src(vendorFiles)
            .pipe(concat('vendor.js'))
            .pipe(dest('dist/js'))
            .pipe(dest(path + "js/"));
    }
};

exports.vendor = fn;
