Game.Template = (function () {
    let configMap = {}

    function getTemplate(templateName) {
        let templates = spa_templates.templates;
        for (let t of templateName.split(".")) {
            templates = templates[t];
        }
        return templates;
    }

    function parseTemplate(templateName, data) {
        return getTemplate(templateName)(data);
    }

    function _init() {
        Handlebars.registerHelper('ifeq', function (a, b, options) {
            if (a === b) { return options.fn(this); }
            return options.inverse(this);
        });

        Handlebars.registerHelper('ifnoteq', function (a, b, options) {
            if (a !== b) { return options.fn(this); }
            return options.inverse(this);
        });
    }

    return {
        init: _init,
        getTemplate,
        parseTemplate,
    }
})()