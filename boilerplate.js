#!/usr/bin/env node
const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");

const src = path.resolve(__dirname);
const dest = path.resolve("./");

console.log(`Copying files to ${dest}...`);

let files = [
    "resources",
    "webpack.mix.js",
    "fractal.js",
];

files.forEach(file => {
    fs.copySync(path.join(src, file), path.join(dest, file));
});

console.log("Done.");

console.log("Remember to run "
    + chalk.underline("npm run dev") + " first, then either "
    + chalk.underline("npm run fractal start") + " or "
    + chalk.underline("npm run fractal build")
    + " to create your pattern library.\n");
