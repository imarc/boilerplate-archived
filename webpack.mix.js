let mix = require('laravel-mix');``
let webpack = require('webpack');

// Mix Public Path
//
// For Laravel or Craft this should be set to the public web path (a.k.a. the
// document root) of your site, which will be 'public' For a Wordpress Theme,
// this should be set to a relative path within your theme directory 'build' is
// recommended. The mix-manifest.json file will be created within this path.

mix.setPublicPath('.');

// Mix Options

mix.options({
    clearConsole: Mix.isWatching()
});

// Extra Webpack Config

mix.webpackConfig({
    plugins: [
        new webpack.ProvidePlugin({
            // aliases added here work globally throughout
            // all modules. These should be used sparingly.
            // jQuery is the perfect example of a library you
            // want 'provide' as plugins expect that jQuery/$
            // is a global variable.
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    watchOptions: {
        // Custom polling options to reduce CPU usage
        // when using `npm run watch`
        poll: Mix.isPolling() ? 1700 : false,
        aggregateTimeout: 600,
        ignored: [ /^(?!.*resources)/ ]
    },
    devtool: "source-map"
});


mix.browserSync({
    proxy: false,
    server: {
        baseDir: "./"
    }
});


// Asset Config
mix
    .js('resources/assets/js/app.js', 'js')
    .sass('resources/assets/sass/app.scss', 'css')
    .options({
        processCssUrls: false
    })
    .sourceMaps()
    .extract()
    .version();



// Full API Examples

// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.ts(src, output); <-- Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });

