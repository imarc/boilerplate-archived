Boilerplate
===========

Imarc Boilerplate is a light, customizable front-end starter kit and component library.

Supported Browsers: IE11+, Chrome, Firefox, and Safari.

* [See the Markup](http://imarc.github.io/boilerplate)
* [See the Structure](http://imarc.github.io/boilerplate/structure)
* [See the CSS](http://imarc.github.io/boilerplate/css/styles.css)

Development
-----------

To get started working on boilerplate, you should have `node` and `npm` installed.

    npm install
    npm run serve

This will watch all your files and run BrowserSync, both compiling SCSS and reloading your browser on any changes.
After launching, view in your browser at [localhost:3000](http://localhost:3000).

Occasionally, clean the SCSS file with CSSComb by running:

    npm run clean

Goals
-----

### Consistent, Clean Markup

The most important goal of Boilerplate is try to build HTML and CSS conventions. Ideally, if
everyone working on a project knows the project is being built from Boilerplate, then anyone
involved with project will end up writing HTML and CSS in a consistent way. Keep the markup clean
and consistent through out the site.

We also take a lot of interest in our semantic use of elements, and Boilerplate should provide some
acceptable conventions that are up to our semantic standards.


### Works as a Placeholder

Boilerplate is **not** meant to be the final look and feel that a site would launch with. It is
meant to act a placeholder, that

* Provides a client-friendly appearance that isn't distracting that we can for prototypes and sites
  in progress.
* Tolerable defaults for elements that might not be styled in the normal build out of the site
  (tables, typographical elements like sup/sub/pre, etc.)


### Light and Semantic

Boilerplate aims to be lighter and more semantic than Twitter Bootstrap. We try to avoid using
non-semantic class names when we can, which means that we do not have a grid system. Boilerplate is
meant to encourage great markup.


### Mobile Friendly, Mobile First

Boilerplate is ready for the mobile world. Boilerplate was built to be 'mobile first' from the
ground up. We have basic mobile, tablet, and desktop styling, as well as structure for media
queries.


At a Glance
===========

* We default to **16 pixel text**. This size is comfortable for reading on a mobile or desktop
  device. This points **95 characters per line** in our default width for main body content, which
  is higher than [the recommended range of 50-75 characters per
  line](http://baymard.com/blog/line-length-readability). Our default line-height is 1.5. All other
font-sizes are **relative using em units**.

* We default to **Helvetica Neue** with **Arial** as a backup for body text.

* Our page defaults to a maximum of **1200 pixels wide**

Mixins
------

### Grouping
**@grouping and .group** are used to make sure the container clears all of its contents. They are a
cleaner alternative to empty clearfix div elements.

### Container
**@container and .container** are used to identify elements that should match the width of the
page.These elements
* have a max-width. The default maximum width is 1024 (1056 with padding.)
* have dynamic margins, so their contents remain centered. By default, these margins will collapse
  to zero if the window is too skinny.
* have fixed padding. This padding is preserved across all screen sizes.

If you're going to increase the size of the container, make sure to consider whether your content is
getting too wide. Boilerplate already is above the recommended maximum widths for keeping content easy to
read.

### Columns
**@columns and .columns** are used to make elements within behave as columns, as a cleaner alternative to
defining classes such as `.one_of_three`, or `.second.fifth`. To create gutters  between columns,
use `hr` elements. This is a semantically appropriate use of the hr tag, and allows for greater
flexibility in controlling and styling the gutter. By default, these gutters are 16px wide.


Layout
------
This contains rules for the site's layout elements: `body`, `header`, `aside`, `article`,
etc. These containers all can contain out layout or typographical block elements.

Note that we are not using the `main` element yet. While it looks great, until its more widely
adopted we're going to stick with the semantic equivalent, `<div class="main" rel="main">`.

### .container
Sometimes we need to identify which elements should be constrained to the maximum width we believe
the site is best viewed at. Some people this is called `.wrapper` or `.frame`, but we're using
`.container` as a mixin and classname that we will only use for this purpose.

### Primary, Secondary, and Tertiary
We use the classes `primary`, `secondary`, and `tertiary` to identify layout elements that might occur
more than once. This includes `<header>`, `<aside>`, `<footer>`, and `<nav>`. The markup includes
examples of `header.primary`, `aside.primary`, `footer.primary`, `nav.primary`, and `nav.secondary`,
however `tertiary`, or even `quarternary` can be used if appropriate.

Typography
----------
This section contains rules for inline typographical styles and typographical blocks. Inline
examples are `a`, `sup`, `strong`, or `code`. Typographical blocks are things like headings, lists,
and blockquotes.

### Headings
When headings are the first child element in a container, they default to no top padding. However,
since we often have rich text content coming out of our CMS, we also needed to make sure that a
heading following a paragraph of text (for example) would be sufficiently spaced from the paragraph
and stand out.

So, when headings are mixed into content, they will always have a 1.5em top padding. This won't
collapse with the 1.5em bottom margin most block elements (like paragraphs, lists, etc.) have,
giving a 3em gap before headings. Second, by using padding instead of margins, the larger area
remains a target for anchors and heading styles.

Lastly, when two headings are adjacent, the second heading not only loses its top padding, but it
also gains a .5em, negative, top margin to bring the two heading together.

### Intro and Highlight
Intro and Highlight are two semantic classes:

* Intro is used to identify a section or paragraph of introductory, overview, or abstract content
  before the main content.
* Highlight is used to for callouts or highlighting specific snippets of text.

Iconography
-----------
We are using [FontAwesome](http://fontawesome.io) for icons. Boilerplate contains snippets from
FontAwesome to enable basic functionality for ~24 hand picked icons. If you'd like to use a lot more
icons, feel free to include FontAwesome's base CSS instead.

Navigation
----------
We always use `ul` elements inside of `nav` elements. There is some light styling to layout a nav
tag in `.torso` as a toolbar.

The primary navigation also has styles for CSS only drop down menus. The primary navigation also has
styles defined for mobile, to remain visible and accessible, and collapse into a single hamburger
icon. Secondary navigation is hidden from headers at mobile sizes.

The primary aside may also contain supplemental navigation. The vertical layout is styled to
`ul.supplemental`, as it is not visually a navigation element.

Forms
-----
Typical styling for `fieldset`, `input` and related elements, as well as some styles for 'lookalike'
elements like `a.button`.

Messaging
---------
This section is used for marking up server generated success, info, and error messages, as well as
help messages typically found in forms.

Tables
------
This section contains exactly what you'd expect.

Section Specific
----------------
This section is initially empty, and is meant for CSS rules targeting entire sections of the site
using the classes providing on the `body` element.

Page Specific
-------------
This section is initially empty as well, and is meant for CSS rules targeting specific pages using
the ID provided on the `body` element.

Media Queries
-------------
We have included all of the breakpoints from Twitter Bootstrap initially.

### aside.primary and .main
For desktop sizes and up, the primary aside becomes visible if it exists. To support pages that
don't have a primary aside as well as those that do, we are using the ~ to set a percentage width to
`.main` but only if `primary.aside` proceeds it.

Print Styles
------------
These rules are primarily from the HTML5 Boilerplate.


License
=======

Boilerplate is released under the Apache License v2.0. See LICENSE.
