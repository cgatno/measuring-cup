const measure = require('../dist/index');

test('converts 1 cup to 8 ounces', () => {
  expect(measure('1 cup').toOunces()).toBe(8);
});
