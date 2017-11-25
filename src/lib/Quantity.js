import ConversionTable from './ConversionTable';

// Regex to extract quantity and type of base measurement
// Expects `<quantity> <type>` - e.g. 12.5 cups
// Important capture groups: (1-based index)
//  1: Decimal or integer quantity (e.g. 12.5)
//  3: Singular measurement type (e.g. 'cup')
const BASE_MEASUREMENT_TEST = /^([0-9]+([,.][0-9]+)?)\s([a-zA-Z]+?)(s\b|\b)/;

export default class Quantity {
  constructor(baseMeasurement) {
    // Input measurement must conform to the regex described above
    if (!BASE_MEASUREMENT_TEST.test(baseMeasurement)) {
      throw new Error(
        'The input measurement must be in the format `<quantity> <unit>` where quantity is an integer or decimal.',
      );
    }

    // Execute regex on the lowercase input
    const measurementFields = BASE_MEASUREMENT_TEST.exec(
      baseMeasurement.toLowerCase(),
    );

    // Store the raw input along with extracted quantity and units
    this.baseMeasurement = {
      raw: baseMeasurement,
      quantity: measurementFields[1],
      unit: measurementFields[3],
    };
  }

  toOunces() {
    return this.convertTo('ounce').toNumber();
  }

  toCups() {
    return this.convertTo('cup').toNumber();
  }

  toTablespoons() {
    return this.convertTo('tablespoon').toNumber();
  }

  toTeaspoons() {
    return this.convertTo('teaspoon').toNumber();
  }

  convertTo(toUnit) {
    return new Quantity(
      `${ConversionTable.getConversionFactor(
        this.baseMeasurement.unit,
        toUnit,
      ) * this.baseMeasurement.quantity} ${toUnit}`,
    );
  }

  toNumber() {
    return Number(this.baseMeasurement.quantity);
  }

  toString() {
    // Pluralize the unit if necessary
    // TODO: Determine if pluralization makes sense. E.g. if the unit is 'oz,' it doesn't make
    // sense to add an 's' even if the quantity is greater than 1.
    const unitString =
      this.baseMeasurement.quantity > 1
        ? `${this.baseMeasurement.unit}s`
        : this.baseMeasurement.unit;
    return `${this.baseMeasurement.quantity} ${unitString}`;
  }
}
