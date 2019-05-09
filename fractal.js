"use strict";

const Path = require("path");
const consolidate = require("@frctl/consolidate");
const fractal = module.exports = require("@frctl/fractal").create();
const twig = require("twig");

twig.extendFunction("prefix", path => Path.join(process.env.URL_PREFIX || '/', path));

fractal.components.engine(consolidate("twig", twig.twig));
fractal.components.set("ext", ".twig");

fractal.components.set("statuses.deprecated", {
    label: "Deprecated",
    description: "May be removed in a future version.",
    color: "#886600",
});

fractal.set("project.title", "Boilerplate");
fractal.components.set("default.context", {scripts: []});
fractal.components.set("path", __dirname + "/resources/styles");
fractal.docs.set("path", __dirname + "/resources/styles/docs");
fractal.web.set("builder.dest", __dirname + "/web/pattern-library");
fractal.web.set('builder.static.ignored', __dirname + "/web/pattern-library");
fractal.web.set("static.path", __dirname + "/web");
