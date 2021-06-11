const {src, dest} = require('gulp');
const handlebars = require('gulp-handlebars');
const declare = require('gulp-declare');
const wrap = require('gulp-wrap');
const concat = require('gulp-concat');
const mergeStream = require('merge-stream');
const path = require('path');

const fn = function (templateFiles, partialFiles, path2) {
    return function () {
        const templates = src(templateFiles)
            // Compile each Handlebars template source file to a template function
            .pipe(handlebars())
            // Wrap each template function in a call to Handlebars.template
            .pipe(wrap('Handlebars.template(<%= contents %>)'))
            // Declare template functions as properties and sub-properties of MyApp.templates
            .pipe(declare({
                namespace: 'spa_templates',
                noRedeclare: true, // Avoid duplicate declarations
                processName: function (filePath) {
                    // Allow nesting based on path using gulp-declare's processNameByPath()
                    // You can remove this option completely if you aren't using nested folders
                    // Drop the client/templates/ folder from the namespace path by removing it from the filePath
                    return declare.processNameByPath(filePath.replace('<parent_map>/templates/', '')); //windows? backslashes: \\
                }
            }))
            .pipe(concat('templates.js'))
            .pipe(dest('dist/js/'));

        const partials = src(partialFiles)
            .pipe(handlebars())
            .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
                imports: {
                    processPartialName: function (fileName) {
                        // Strip the extension and the underscore
                        // Escape the output with JSON.stringify
                        return JSON.stringify(path.basename(fileName, '.js').substr(1));
                    }
                }
            }));

        return mergeStream(partials, templates)
            .pipe(concat('templates.js'))
            .pipe(dest('dist/js/'))
            .pipe(dest(path2 + "js/"));
    }
};

exports.js = fn;
