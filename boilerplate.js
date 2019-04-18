#!/usr/bin/env node
const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");

const src = path.resolve(__dirname);
const dest = path.resolve(path.dirname(path.dirname(src)));

if (!src.match("node_modules")) {
    console.log("Must be called from within node_modules.");
    process.exit(1);
}

console.log(`Copying files from ${src} to ${dest}...`);

let files = [
    "resources",
    "webpack.mix.js",
    "fractal.js",
];

files.forEach(file => {
    fs.copySync(path.join(src, file), path.join(dest, file));
});

console.log("Done.\n\n");

console.log("Remember to run npm run dev first, then either "
    + chalk.underline("npm run fractal start") + " or "
    + chalk.underline("npm run fractal build")
    + " to create your pattern library.\n");
