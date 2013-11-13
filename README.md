Boilerplate
===========

We're currently developing a boilerplate for new sites. This is meant work
as a lighter, customized variant of something like Twitter Bootstrap or the
HTML5 Boilerplate, by focusing on our uses, aligning things with our semantics,
and being willing to allow for slightly more variance between browsers.

We're targeting IE8+, Chrome, Safari, and Firefox. We're aiming for boilerplate to
be functional in IE7, however we are willing to accept visual degradation.

Take a Look
-----------
* [See the Markup](http://imarc.github.io/boilerplate)
* [See the Structure](http://imarc.github.io/boilerplate/structure)
* [See the CSS](http://imarc.github.io/boilerplate/css/styles.css)

Our Goals
---------
We pay a lot of attention to the semantics of our elements and class names when building sites.
HTML5 provides more semantic elements and we've worked with them enough to figure out how we want to
adopt them into our sites going forward.

We wanted this file to be lighter than Twitter Bootstrap or the HTML5 Boilerplate and restructured
in a way that was more fitting our mentality. Rather than layering our notions on top of one of
these others, we wanted to take what we could from them create a base that fits us.

We also wanted to be more read for the mobile world. For us, this not only meant we needed to
include a place for media queries, but that we should be mindful of keeping font sizes, vertical
padding and vertical margins relative to the font size when appropriate. We set the font-size to
**16px** on the `body` element, and all other font sizes and most vertical padding and margins are
relative to this.


Our Stylesheet Sections
=======================

A Table of Contents
------------------------
We like our CSS with a table of contents as we find this helps keep everything more organized.

Variables
---------
We use SASS for Boilerplate. We primarily use variables for identifying colors that repeat through
the design. Typical variables might be

* **Matte** – the matte color is background outside of the layout. This may
  either be the color that surrounds all the torso, or perhaps just the color
  of the header and footer.
* **Torso Background** – this is the background color of the `.torso` element.
* **Selection** – color used for selected text.

* **Plain Text** – for the base text color.
* **Meta Text** – a lower contrast text color for text that has less emphasis. Typically the color
  used for things like dates and references.
* **Link** – the link color.
* **Link Hover** – the link color while hovering over a link.

* **Border** – typically a low contrast color for borders, dividers, blockquote margins, etc.

* **Success** – background color for success messages.
* **Error** – background color for error messages.
* **Info** – background color for info messages.

Web Fonts
---------
Web fonts is here because `@import` statements have to come first. We prefer including fonts from
the CSS instead of from the HTML. It makes it easier to reuse the styles elsewhere or reference them
from iframes (such as with TinyMCE.)

Base
----
This is mostly our reset. Our reset is inspired by both the HTML5 Boilerplate reset as well as Eric
Meyers reset, however we've tweaked it to only include elements we intend to use and restyle.

### No * reset
We only reset tags we know we're going to define new behavior for. Elements that we aren't going to
define are excluded from our reset.

### Border Box
By default, we change elements to use the border-box box model. We prefer working with the
border-box model, and since Boilerplate is an IE8+ project, we can safely include this. See [Paul
Irish's article recommending this](http://www.paulirish.com/2012/box-sizing-border-box-ftw/) for
more information.

### Block Elements
Some elements aren't defined as blocks in IE8/9 even though they should be.
([normalize.css:8](https://github.com/necolas/normalize.css/blob/master/normalize.css#L8))

### HTML
Our default, web safe font stack looks for Arial and Helvetica. Boilerplate is designed to look best
with a base font size of 16px. All other font sizes are relative to this one size by using ems.

The two `text-size-adjust` rules address an issue with iOS where text size is increased in when
orientation changes. ([normalize.css:62](https://github.com/necolas/normalize.css/blob/master/normalize.css#L62))

### BODY
It's important to have a min-width specified on the body element so that Mobile Safari will infer
the correct size to use for the viewport. ([Stack Overflow](http://stackoverflow.com/a/6697166),
([Apple Documentation](https://developer.apple.com/library/safari/documentation/appleapplications/reference/safariwebcontent/usingtheviewport/usingtheviewport.html))

### ::-moz-selection and ::selection
Both need to be specified, separately, for these to work, as Firefox still requires the prefix and
all other browsers will skip the selection as invalid for containing the vendor prefix. ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::selection))


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

Boilerplate is released under the MIT license. See LICENSE for the full license.
