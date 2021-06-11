const {series, parallel, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const config = require('./config');

const sass = require('./tasks/sass').sass(config.localServerProjectPath, config.files.sass);
sass.displayName = 'sass';

const js = require('./tasks/js').js(config.files.js, config.files.jsOrder, config.localServerProjectPath);
js.displayName = 'js';

const vendor = require('./tasks/vendor').vendor(config.files.vendor, config.localServerProjectPath);
vendor.displayName = 'vendor';

const html = require('./tasks/html').js(config.files.html, config.localServerProjectPath);
html.displayName = 'html';

const templates = require('./tasks/templates').js(config.files.templates, config.files.partials, config.localServerProjectPath);
templates.displayName = 'templates';

const watchFiles = () => {
    watch(config.files.sass, series(sass));
    watch(config.files.js, series(js));
    watch(config.files.html, series(html));
    watch(config.files.vendor, series(vendor));
    watch(config.files.templates, series(templates));
    watch(config.files.partials, series(templates));
};

exports.watch = watchFiles;

exports.js = js;
exports.sass = sass;
exports.html = html;
exports.vendor = vendor;
exports.templates = templates;
exports.build = parallel(js, sass, html, vendor, templates);
