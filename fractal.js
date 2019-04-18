'use strict';

const fractal = module.exports = require('@frctl/fractal').create();
const consolidate = require('@frctl/consolidate');
const twig = require('twig');

const twigAdapter = consolidate('twig');

fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

fractal.set('project.title', 'Boilerplate');
fractal.components.set('default.context', {scripts: []});
fractal.components.set('path', __dirname + '/resources/styles');
fractal.docs.set('path', __dirname + '/resources/styles/docs');
fractal.web.set('builder.dest', __dirname + '/web/pattern-library');
fractal.web.set('static.path', __dirname + '/web');

