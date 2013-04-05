iMarc Boilerplate
=================

We're currently developing a boilerplate for new sites. This is meant work
as a lighter, customized variant of something like Twitter Bootstrap or the
HTML5 Boilerplate, by focusing on our uses, aligning things with our semantics,
and being willing to allow for slightly more variance between browsers.

We're targeting IE8+, Chrome, Safari, and Firefox. We're aiming for boilerplate to
be functional in IE7, however we are willing to accept visual degradation.

Take a Look
-----------
* [See the Markup](http://imarc.github.com/boilerplate/markup)
* [See the Structure](http://imarc.github.com/boilerplate/structure)
* [See the CSS](https://github.com/imarc/boilerplate/blob/gh-pages/css/styles.css)

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


Our Sections
============

A Table of Contents
------------------------
We like our CSS with a table of contents as we find this helps keep everything more organized.

Web Fonts
---------
Web fonts is here because `@import` statements have to come first. We prefer including fonts from
the CSS instead of from the HTML. It makes it easier to reuse the styles elsewhere or reference them
from iframes (such as with TinyMCE.)

Base
----
This is mostly our reset. Our reset is inspired by both the HTML5 Boilerplate reset as well as Eric
Meyers reset, however we've tweaked it to only include elements we intend to use and restyle.

Grouping
--------
We have two classes we use for identifying how a particular tag should behave:
 * `.group` is used to make sure the container clears all of its contents, and is a cleaner
   alternative to empty clearfix div elements.
 * `.columns` is used to make div elements within behave as columns, as a cleaner alternative to
   defining classes such as `.one_of_three`, or `.second.fifth`.

Layout
------
This contains rules for the site's layout elements: `body`, `header`, `aside`, `article`,
etc. These containers all can contain out layout or typographical block elements.

Note that we are not using the `main` element yet. While it looks great, until its more widely
adopted we're going to stick with the semantic equivalent, `<div class="main" rel="main">`.

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

Navigation
----------
We are including styles for working CSS only drop down, primary and secondary navigation as well as
sidebar secondary navigation. We also have very basic styles for utility navigation as well.

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

Print Styles
------------
These rules are primarily from the HTML5 Boilerplate.


License
=======

iMarc Boilerplate is released under the MIT license. See LICENSE for the full license.
