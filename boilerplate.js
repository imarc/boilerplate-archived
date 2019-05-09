#!/usr/bin/env node
const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");
const npm = require("npm");
const json = require("jsonfile");

const src = path.resolve(__dirname);
const dest = path.resolve("./");
const packageJsonPath = path.resolve("./package.json");

const scripts = {
    "fractal": "fractal",
    "dev": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "prod": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --watch-poll --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch:event": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
};

// Add the dependency
console.log("Installing NPM dependency...");

npm.load({}, function(er, npm) {
    if (er) {
        console.log("Error loading package.json. Make sure you've created one first.");
        process.exit();
    }
    npm.commands.install(["imarc/boilerplate#v4"]);
});

// Add the files
console.log(`Copying files to ${dest}...`);

let files = [
    "resources",
    "webpack.mix.js",
    "fractal.js",
];

files.forEach(file => {
    fs.copySync(path.join(src, file), path.join(dest, file));
});

// Add the scripts to package.json
console.log("Updating scripts within package.json...");
let packageJson = json.readFileSync(packageJsonPath);

let overlap = Object.keys(packageJson.scripts).filter(key => Object.keys(scripts).includes(key));
packageJson.scripts = Object.assign(scripts, packageJson.scripts);

if (overlap.length) {
    console.log(`The following scripts were already defined: ${overlap}`);
}

json.writeFileSync(packageJsonPath, packageJson);


// All done.
console.log("Done.");
console.log("Remember to run "
    + chalk.underline("npm run dev") + " first, then either "
    + chalk.underline("npm run fractal start") + " or "
    + chalk.underline("npm run fractal build")
    + " to create your pattern library.\n");
