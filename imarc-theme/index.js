'use strict';

module.exports = require('./dist').default;
module.exports.annotations = [];

module.exports.annotations.push(function () {
    return {
        name: 'emmet',
        parse: text => text,
    };
});

module.exports.annotations.push(function () {
    return {
        name: 'demo',
        parse: text => text,
    };
});
