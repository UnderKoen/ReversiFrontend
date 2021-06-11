module.exports = {
    localServerProjectPath : 'E:/Projects/Dot Net/ReversiMvcApp/ReversiMvcApp/wwwroot/',
    files: {
        js: [
            'src/js/**/*.js',
        ],
        jsOrder: [
            'src/js/game.js',
            'src/js/**/*.js',

        ],
        html: [
            './src/index.html'
        ],
        sass: [
            './src/css/**/*.css',
            './src/css/**/*.scss',
        ],
        vendor: [
            './vendor/**/*.js',
        ],
        templates: [
            './templates/**/[^_]*.hbs',
        ],
        partials: [
            './templates/**/_*.hbs',
        ]
    },
    voornaam: 'Koen'
};