# measuring-cup

[![Build Package](https://github.com/cgatno/measuring-cup/actions/workflows/build.yml/badge.svg)](https://github.com/cgatno/measuring-cup/actions/workflows/build.yml)
[![npm version](https://badge.fury.io/js/measuring-cup.svg)](https://badge.fury.io/js/measuring-cup)

A quick and simple tool to convert cooking measurements like ounces, cups and
tablespoons right in your code! 📏🥛

## tl;dr (Getting Started)

Currently, measuring-cup is distributed via npm with no dependencies.

    npm install --save measuring-cup

## Usage

The API for measuring-cup is straightforward and designed for simplistic,
semantic coding:

```javascript
const measure = require('measuring-cup');

console.log(measure('1 cup').toOunces()); // `8`
```

The package exports a function which takes a single string argument in the form
of:

    <quantity> <unit>

Quantities should always be in the form of an integer or decimal (e.g. 3 or
2.5). Units can be passed as singular or plural, and most abbreviations are
supported.

Here's a list of examples, all of which are valid measuring-cup inputs:

* 2 cups
* 3.5 tablespoons
* 6 tsp
* 1 ounce
* 15 oz
* 5 lbs

For a full list of supported units, see the [chart below](#supported-units).

### Chaining Conversions

By default, calling a conversion function like `toOunces()` or `toCups()`
returns a `number`. You can override this behavior by manually specifying the
conversion with the `convertTo()` function:

```javascript
const measure = require('measuring-cup');

console.log(
  measure('3 cups')
    .convertTo('ounces')
    .toString(),
); // `24 ounces`
```

The `convertTo()` function returns a `Quantity` object that can be used for
further conversions, printing a string representation of the quantity, or simply
retrieving the quantity as a `number`.

Here's an example demonstrating conversion chaining for a bulk recipe that
requires half as much cumin as onion:

```javascript
// Calculations for bulk soup recipe
// Add as much onion as you like, add half as much cumin

const measure = require('measuring-cup');

// DISCLAIMER: This could result in you adding quite a bit of onion...
// Don't try this at home unless you're up for some tearful cooking!
const ouncesOnion = Math.floor(Math.random() * 101);

// Convert to cups for easier to measure quantity.
const onions = measure(`${ouncesOnion} oz`).convertTo('cups');

console.log(`Add ${onions.toString()} of onion.`);

// Remember, we need to add half as much cumin as onion
// Convert the onion to tablespoons first, then divide by 2.
// Cumin is much easier to measure in tablespoons 😅
const cumin = measure(`${onions.toTablespoons() / 2} tbsp`);

console.log(`Add ${cumin.toString()} of cumin.`);
```

### Supported Units

| Input (aliases)   | toCups() | toOunces() | toTablespoons() | toTeaspoons() | toPints() | toQuarts() | toGallons() |
| ----------------- | :------: | :--------: | :-------------: | :-----------: | :-------: | :--------: | :---------: |
| cups              |    ✅    |     ✅     |       ✅        |      ✅       |    ✅     |     ✅     |     ✅      |
| ounces (oz)       |    ✅    |     ✅     |       ✅        |      ✅       |    ✅     |     ✅     |     ✅      |
| tablespoons(tbsp) |    ✅    |     ✅     |       ✅        |      ✅       |    ✅     |     ✅     |     ✅      |
| teaspoons (tsp)   |    ✅    |     ✅     |       ✅        |      ✅       |    ✅     |     ✅     |     ✅      |
| pints (pt)        |    ✅    |     ✅     |       ✅        |      ✅       |    ✅     |     ✅     |     ✅      |
| quarts (qt)       |    ✅    |     ✅     |       ✅        |      ✅       |    ✅     |     ✅     |     ✅      |
| gallons (gal)     |    ✅    |     ✅     |       ✅        |      ✅       |    ✅     |     ✅     |     ✅      |

The table above lists the currently supported input units along with supported
aliases (typically abbreviations). Both singular and plural forms are supported
(e.g. cup and cups).

Currently, for units that can refer to liquids or solids (cups, ounces, etc.)
measuring-cup assumes a liquid. Support for solid measurements is coming soon!

The table above also shows which conversions are supported by a given input. For
example, pounds are not directly convertible to cups. In the future, the API
will allow the user to specify his or her own reusable conversions for these
situations.

If you'd like to see a new unit of measurement supported, please
[open an issue](https://github.com/cgatno/measuring-cup/issues) noting your
request.

## Contributing

All are welcomed _and encouraged_ to contribute to this fun, silly project!

    git clone https://github.com/cgatno/measuring-cup
    cd measuring-cup
    npm install

Even though this isn't exactly a "mission critical" or groundbreaking Node
module, I think it's a great little project to hack on if you're just getting
started with Node or looking for something fun to work on.

Despite its whimsical nature, this project places an emphasis on writing
well-structured, quality code. Major features should be testable and accompanied
by a unit test.

If you're feeling up to the challenge, please read on before jumping in! It's
really not that bad, and I promise you'll have lots of fun along the way.

_Take a look at the
[development environment tips](#some-notes-on-development-environment) for hints
on getting set up._

### Transpiling Source Code

In general, measuring-cup is written using "plain old" JavaScript syntax and
features. The project is configured to use Babel to transpile ES2015+ code into
a browser-compatible version before distribution.

When writing or editing code, always use the `src/` directory and prefer newer
JavaScript features if they're more efficient than alternatives.

To transpile the source code, use `npm run build`. You should always rebuild the
project before running tests.

### Unit Testing

I've implemented a basic [Jest](https://facebook.github.io/jest/) setup for
quick and easy unit testing.

Place all unit tests in the `tests/` directory with the file extension
`.test.js`.

If you're not familiar with Jest, take a look at the
[docs](https://facebook.github.io/jest/docs/en/getting-started.html) or some of
the existing tests to get started. The syntax is extremely semantic and
easy-to-read, so you'll be able to figure it out in no time.

You can run all unit tests at once using `npm test`. Don't forget to rebuild
your code before testing!

### Code Guidelines

ESLint is used to enforce some general code rules. Currently, the ESLint
configuration uses a simplistic [Prettier](https://prettier.io/) ruleset for
formatting and the
[ESLint default recommendations](https://eslint.org/docs/rules/) for
error-checking.

If you're adding lots of new code for your feature or bug fix, be sure that it
passes linting (I'm using the ESLint recommendations for this project). You can
lint your code at any time by running `npm run lint`.

As always, be sure that your code contains comments explaining _why_ it's
written the way it is.

If your code doesn't pass through the linter error-free, that's okay! (I've
failed plenty of tests, and teachers have _usually_ given me a second chance!)
Just make sure your code is commented and give a brief explanation of why
linting fails when you submit your pull request. I'll be happy to work with you
to get it all figured out. 🙂

### Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available,
see the [tags on this repository](https://github.com/cgatno/measuring-cup/tags).

### Communication

Even if you don't want to work on the project yourself, you can help out a lot
just by reporting any bugs you find or enhancements you want to see added!

Head over to [GitHub's issue tracker](https://github.com/cgatno/measuring-cup/issues) to
submit a bug report or let us know about a feature request!

### Some Notes on Development Environment

I highly recommend using [VS Code](https://code.visualstudio.com/) for this
project. I use it for all of my day-to-day JavaScript programming, and it's an
outstanding tool.

Since my editor of choice is VS Code, this project comes with a full-featured VS
Code config out-of-the-box. If you love another editor (don't worry—I won't be
_totally_ heartbroken), don't hesitate to contribute your own config! I'll
gladly add it to the project.

If you _do_ use VS Code...woohoo! 🎉 I highly recommend the following extensions
for a more streamlined dev experience with this project and many others:

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)

You can always find a
[Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
manifest of my current VS Code setup here:
[https://gist.github.com/cgatno/736e826c4f7cfb43ab6946bbee8f98f2](https://gist.github.com/cgatno/736e826c4f7cfb43ab6946bbee8f98f2).

### Don't Be Afraid To Ask for Help!

Last but _certainly_ not least, **don't be afraid to reach out for help!** If
you have any questions, don't hesitate to
[shoot me an email](mailto:hello@christiangaetano.com)! 📫🙌

## Authors

* [Christian Gaetano](http://christiangaetano.com)

See also the list of
[contributors](https://github.com/cgatno/measuring-cup/contributors) who
participated in this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.
