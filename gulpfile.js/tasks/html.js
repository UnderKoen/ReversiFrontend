const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');

const {src, dest} = require('gulp');
    const fn = function (htmlFiles, serverProjectPath) {
        return function () {
            return src(htmlFiles)
                .pipe(htmlmin({
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true,
                    removeComments: true
                }))
                .pipe(rename(function (path) {
                    path.dirname += "/";
                    path.basename = 'index';
                    path.extname = ".html";
                }))
                .pipe(dest('./dist'))
                .pipe(dest(serverProjectPath));
        }
};

exports.js = fn;
