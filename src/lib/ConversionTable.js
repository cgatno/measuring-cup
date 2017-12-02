// @flow

// For quick lookup of zero-based index of a given unit in the factor table
const lookup = {
  cup: 0,
  ounce: 1,
  oz: 1,
  tablespoon: 2,
  tbsp: 2,
  teaspoon: 3,
  tsp: 3,
};

// Defines multiplication factor for converting between units
// TODO: make the factor table more intelligent, recursive in a way
const factorTable = [
  // cup, oz, tbsp, tsp
  [1, 8, 16, 48], // cup
  [1 / 8, 1, 2, 6], // oz
  [1 / 16, 1 / 2, 1, 3], // tbsp
  [1 / 48, 1 / 6, 1 / 3, 1], // tsp
];

export default class ConversionTable {
  static getConversionFactor(fromUnit: string, toUnit: string) {
    // Check that both units specified can be looked up
    if (!lookup[fromUnit.toLowerCase()] && !lookup[toUnit.toLowerCase()]) {
      throw new Error(
        'The specified `from` and `to` units must both exist in the lookup table.',
      );
    }

    return factorTable[lookup[fromUnit.toLowerCase()]][
      lookup[toUnit.toLowerCase()]
    ];
  }
}
