const lookup = {
  cup: 0,
  ounce: 1,
};

// TODO: make the factor table more intelligent, recursive in a way
const factorTable = [
  // cup, ounce
  [1, 8], // cup
  [1 / 8, 1], // ounce
];

export default class ConversionTable {
  static convert(fromUnit, toUnit) {
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
