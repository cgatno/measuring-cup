const measure = require("../dist/index");

// TODO: Need full test coverage! 💯
// - Add some kind of automated testing to check all conversions both ways

test("converts 1 cup to 8 ounces", () => {
  expect(measure("1 cup").toOunces()).toBe(8);
});

test("converts 6 cups to 96 tablespoons", () => {
  expect(measure("6 cups").toTablespoons()).toBe(96);
});

test("converts 1 ounce to 2 tablespoons", () => {
  expect(measure("1 oz").toTablespoons()).toBe(2);
  expect(measure("1 ounce").toTablespoons()).toBe(2);
});

test("converts 12 ounces to 1.5 cups", () => {
  expect(measure("12 oz").toCups()).toBe(1.5);
  expect(measure("12 ounces").toCups()).toBe(1.5);
});

test("converts 1 tablespoon to 3 teaspoons", () => {
  expect(measure("1 tbsp").toTeaspoons()).toBe(3);
  expect(measure("1 tablespoon").toTeaspoons()).toBe(3);
});

test("converts 12 teaspoons to 2 ounces", () => {
  expect(measure("12 tsp").toOunces()).toBe(2);
  expect(measure("12 teaspoons").toOunces()).toBe(2);
});

test("converts 3 gallons to 384 ounces", () => {
  expect(measure("3 gal").toOunces()).toBe(384);
  expect(measure("3 gallons").toOunces()).toBe(384);
});

test("converts 11 pints to 22 cups", () => {
  expect(measure("11 pt").toCups()).toBe(22);
  expect(measure("11 pints").toCups()).toBe(22);
});

test("converts 4 quarts to 256 tablespoons", () => {
  expect(measure("4 qt").toTablespoons()).toBe(256);
  expect(measure("4 quarts").toTablespoons()).toBe(256);
});
