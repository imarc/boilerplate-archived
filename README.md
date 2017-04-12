Boilerplate
===========

Imarc Boilerplate is a light, customizable frontend starter kit and component library.
It helps jumpstart and optimize frontend development. With its light design and
lack of rigid grid framework, we are able to port it to various creative designs.

Supported Browsers: IE11+, Chrome, Firefox, and Safari.

* [View Boilerplate](http://imarc.github.io/boilerplate)
* [View the Markup](https://github.com/imarc/boilerplate/blob/gh-pages/index.html)
* [View the SCSS](http://imarc.github.io/boilerplate/css/styles.scss)

Get Started
-----------

To get started working with Boilerplate, you [should have `node` installed](https://nodejs.org/en/).
Installing `node` will automatically give you `npm`. Alternatively, if you have [Homebrew](https://brew.sh/),
you can install node via Homebrew.

    npm install
    npm run serve

The `npm run serve` command will watch all your files and run BrowserSync, both compiling
SCSS and reloading your browser on any changes.

After launching, view in your browser at [localhost:3000](http://localhost:3000).


Goals
-----

### Consistent, clean markup

An important goal of Boilerplate is to build internal HTML and SCSS conventions.
If everyone working on a project knows Boilerplate is the foundation, then our
HTML and SASS will be clean and consistent.


### Works as a placeholder

Boilerplate is **not** meant to be the final look and feel that a site would launch with. It is
meant to act a placeholder that

* Serves as the starting point for frontend development.
* Provides a client-friendly appearance that isn’t distracting that we can for prototypes and sites
  in progress.
* Has tolerable defaults for elements that might not be styled in the normal build-out of a project
  (tables, typographical elements like sup/sub/pre, etc.)


### Light and Semantic

Boilerplate aims to be lighter and more semantic than Bootstrap. We try to avoid using
non-semantic class names when we can, which means that we do not have a grid system.
Boilerplate is meant to encourage great markup.


### Mobile friendly, mobile first

Boilerplate is ready for the mobile world. It was built to be ‘mobile first’ from the
ground up. We have basic small, medium, and large breakpoint styles.


Components
----------

[Components](http://imarc.github.io/boilerplate/components/) are pre-defined user
interface elements that web authors can use as a starting point during frontend
development. Most of these are powered via SASS mixins found in the
`_components.scss` file. Some components also rely on JavaScript plugins in
addition to or instead of the mixins. Relevant JavaScript is found in the `js` directory.

## Using components in a project

Include `_components.scss` into your `styles.scss` file. All component mixins
should be called from the main `styles.scss` file.


### Custom arguments

Some components have default SASS keyword arguments. These can and should be overridden
to better achieve your design. For example, the
[tiles](http://imarc.github.io/boilerplate/components/tiles.html) component is a multi-row
layout, similar to a grid. By default, including the tiles mixin will result in a four
column layout with 2rem-wide gutter spacing.

    @mixin tiles($gutter: 2rem, $columns: 4) { … }

 Pass in values of your choice.

    .products {
      @include tiles($gutter: 66px, $columns: 3)
    }

### Extending components

The `_components.scss` file can be edited on a project-by-project basis in order to best
fit your project. If your new or modified components are different than what came
“out of the box”, please comment above each relevant mixin. Ask yourself “Would another
Imarc engineer be able to quickly understand what my project’s component does?” If the answer
is no, comment and describe.

Example of an extended component

    .tiles {
        @include tiles($gutter: 6rem, $columns: 3);
        > * {
            background-color: $brand-blue;
            border-left: 6px solid #FFF;
            border-right: 6px solid #FFF;
            color: #FFF;
            margin-bottom: 2rem;
        }
        h3 {
            background-color: $brand-blue-dark;
            color: $brand-blue-light;
            display: inline-block;
            font-size: 1rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }
    }



### Improving components

Components are not perfect and will need continual maintenance and improvement.
If you feel a component needs attention, please
[create a pull request](https://github.com/imarc/boilerplate/pulls/) with your
improvements you feel can be merged in, or submit
an [issue](https://github.com/imarc/boilerplate/issues).


CSS
----

Items worth calling out in Boilerplate’s stylesheet:

### Variables

Boilerplate makes wide use of SASS variables. Declare variables at the top of the
`styles.scss` file. These will certainly change per project. Note, media
query breakpoint values are used here as well:

    $medium: 669px;
    $large: 1024px;

### Mixins

Sass mixins are important and live in their own section. Some heavily used mixins are:

#### Button
`@button` and `.button` are used to style primary call-to-action anchors and buttons.

#### Container
`@container` and `.container` are used to identify elements that should match the width of the
page. `.container` should not be used for styling. It is a dedicated site container class.
Our site container is 1200 pixels wide (1168 pixels after padding).

#### Columns
`@columns` and `.columns` make direct children behave as columns, as a cleaner alternative to
defining classes such as `.one_of_three`, or `.second.fifth`. To create gutters between columns,
use `hr` elements. This is a semantically appropriate use of the hr tag, and allows for greater
flexibility in controlling and styling the gutter. By default, these gutters are 16px wide.

#### Grouping
`@grouping` and `.group` are used to make sure the container clears all of its floated children.
They are a cleaner alternative to empty clearfix div elements.

#### No Bullets
`@no-bullets` removes default styling to ordered/unordered lists.


### Layout
This section contains the majority of a project’s styles. Need to set the widths for `main` and
`aside.primary` elements? This goes in **Layout**. Styling a featured blog post callout? Put it
here in **Layout**.


### Typography

#### Intro and Highlight

`.intro` and `.highlight` are two semantic classes:

* Intro is used to identify a section or paragraph of introductory, overview, or abstract content
  before the main content.
* Highlight is used to for callouts or highlighting specific snippets of text.


### Iconography

Boilerplate uses [Font Awesome](http://fontawesome.io) for iconography. Use the dedicated `@fontawesome`
mixin or utilize official Font Awesome markup:

    <i class="fa fa-caret-square-o-right" aria-hidden="true"></i>


### Messaging

This section is used for marking up server generated success, info, and error messages, as well as
help messages typically found in forms.

### Media Queries

We utilize three breakpoints – small, medium, and large. Please keep all media query properties in this area.
WHhile there can be benefits of breaking in and out of media queries throughout a stylesheet, we have no yet
standardized a way that is helpful for all engineers.

Documentation
-------------

Documentation for Boilerplate is generated using [SassDoc](http://sassdoc.com/) and can be found in the
sassdoc folder or [viewed online](http://imarc.github.io/boilerplate/sassdoc/).

We should update the documentation and commit it back when we make significant changes to our components
especially so our documentation isn't too far behind.


### Updating the Docs

You can regeneration the documentation by running

    npm docs


License
-------

Boilerplate is released under the Apache License v2.0. See LICENSE.
