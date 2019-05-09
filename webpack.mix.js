let mix = require('laravel-mix');
let webpack = require('webpack');

// Mix Public Path
//
// For Laravel or Craft this should be set to the public web path (a.k.a. the
// document root) of your site, which will be 'public' For a Wordpress Theme,
// this should be set to a relative path within your theme directory 'build' is
// recommended. The mix-manifest.json file will be created within this path.

mix.setResourceRoot(process.env.RESOURCE_ROOT || '/');
mix.setPublicPath('web');

// Mix Options

mix.options({
    clearConsole: Mix.isWatching()
});

// Extra Webpack Config

mix.webpackConfig({
    module: {

        // Support wildcards within Scss imports.
        rules: [
            {
                test: /\.scss$/,
                loader: 'import-glob-loader',
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: '$',
                }],
            },
        ],
    },

    watchOptions: {
        // Custom polling options to reduce CPU usage
        // when using `npm run watch`
        poll: Mix.isPolling() ? 1700 : false,
        aggregateTimeout: 600,
        ignored: [ /^(?!.*resources)/ ]
    },

    devtool: "source-map"
});

// Aliases added here work globally throughout
// all modules. These should be used sparingly.
// jQuery is the perfect example of a library you
// want 'provide' as plugins expect that jQuery/$
// is a global variable.
// See: https://laravel-mix.com/docs/4.0/autoloading
mix.autoload({
    jquery: ['$', 'jQuery', 'window.$', 'window.jQuery']
});

// Asset Config

mix.js('resources/js/plugins/accordion.plugin.js', 'js/plugins');
mix.js('resources/js/plugins/stickyElement.plugin.js', 'js/plugins');
mix.js('resources/js/plugins/mobileNavigation.plugin.js', 'js/plugins');
mix.js('resources/js/plugins/stickyHeader.plugin.js', 'js/plugins');
mix.js('resources/js/plugins/dropdown.plugin.js', 'js/plugins');
mix.js('resources/js/plugins/tabs.plugin.js', 'js/plugins');

mix.js('resources/js/main.js', 'js')
mix.sass('resources/styles/main.scss', 'css', {
        includePaths: ['resources/styles'],
    });
mix.extract();
mix.sourceMaps();
mix.version();

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
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
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.dump(); <-- Dump the generated webpack config object t the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
