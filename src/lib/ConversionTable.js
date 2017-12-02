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
  pint: 4,
  pt: 4,
  quart: 5,
  qt: 5,
  gallon: 6,
  gal: 6,
};

// Defines multiplication factor for converting between units
// TODO: make the factor table more intelligent, recursive in a way
const factorTable = [
  // cup, oz, tbsp, tsp, pt, qt, gal
  [1, 8, 16, 48, 1 / 2, 1 / 4, 1 / 16], // cup
  [1 / 8, 1, 2, 6, 1 / 16, 1 / 32, 1 / 128], // oz
  [1 / 16, 1 / 2, 1, 3, 1 / 32, 1 / 64, 1 / 256], // tbsp
  [1 / 48, 1 / 6, 1 / 3, 1, 1 / 96, 1 / 192, 1 / 768], // tsp,
  [2, 16, 32, 96, 1, 1 / 2, 1 / 4], // pt
  [4, 32, 64, 192, 2, 1, 1 / 2], // qt
  [16, 128, 256, 768, 8, 4, 1], // gal
];

export default class ConversionTable {
  static getConversionFactor(fromUnit: string, toUnit: string): number {
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
