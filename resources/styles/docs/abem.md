---
label: ABEM
order: 2
---

[ABEM](https://css-tricks.com/abem-useful-adaptation-bem/) is a variant of [BEM](http://getbem.com/). Both are targeting and naming conventions for CSS.


### Why BEM?

BEM (Block, Element Modifier) is a convention for targeting and naming CSS. Using this convention makes our code more clear, more consistent, and more modular. It's a popular and well documented, and pairs well with Atomic Design or other methodologies, as it it makes it easier to find which file a class is likely defined.

* **BEM blocks should be reusable.** Other developers should be comfortable re-using a BEM block.
* **BEM classes are namespaced to the block.** All CSS properties should be targeted to a classname that contains the name of the BEM block to avoid collisions with other classes.
* **BEM won't conflict with semantic elements.** Regardless of whether semantic something should an `<a>`, `<nav>`, or `<button>`, you can use whatever BEM classes you'd like.


### Why Atomic Design?

[Atomic Design](http://atomicdesign.bradfrost.com/) defines a structure for organizing blocks. It's well documented, flexible, and works well with our other tools and methodologies. It also promotes thinking about reuse first when building, encouraging developers to not only create reusable BEM blocks, but *reuse* the blocks in the creation of bigger, fancier blocks.

* **Atomic Design** has a short set of categories for all blocks.
* It encourages creating small blocks and reusing them in larger and fancier blocks.
* It lends itself to extending a style guide into a pattern library.


### Why ABEM?

ABEM (Atomic BEM) is a slight variant of BEM that makes two important changes as well as slightly changing the syntax.

* BEM: `block-name__element-name--modifier-name`
* ABEM: `NS-blockName__elementName -modifierName`

Here's an example of markup using BEM:

```
<header class="site-header site-header--transparent site-header--fixed js-stickyHeader">
    <a class="site-header__company-logo site-header__company-logo--dark-knockout">
        <!-- -->
    </a>
    <nav class="site-header__primary-navigation">
        <!-- -->
    </nav>
    <button class="site-header__call-to-action button button--primary button--large">
        <!-- -->
    </button>
<header>
```

And here's it using ABEM:

```
<header class="siteHeader -transparent -fixed js-stickyHeader">
    <a class="siteHeader__companyLogo -darkKnockout">
        <!-- -->
    </a>
    <nav class="siteHeader__primaryNavigation">
        <!-- -->
    </nav>
    <button class="siteHeader__callToAction button -primary -large">
        <!-- -->
    </button>
<header>
```

The notable features are:

* Block, element, and modifier names are in lowerCamelCase instead of kebab-case.
* Modifiers are separate classes prefixes with a leading dash.
* You can use a namespace prefix if you'd like, typically to indicate the Atomic Design block type (Atom, Molecule, Organism, Template or Page) or to indicate that a class is meant strictly for JavaScript targeting (`js-stickyHeader`.)

The choice to use ABEM is primarily for legibility. Code is read way more than it is written, and ABEM makes markup easier to read.
