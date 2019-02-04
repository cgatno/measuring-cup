// @flow

import ConversionTable from './ConversionTable';

// Regex to extract quantity and type of base measurement
// Expects `<quantity> <type>` - e.g. 12.5 cups
// Important capture groups: (1-based index)
//  1: Decimal or integer quantity (e.g. 12.5)
//  3: Singular measurement type (e.g. 'cup')
const BASE_MEASUREMENT_TEST = /^([0-9]+([,.][0-9]+)?)\s([a-zA-Z]+?)(s\b|\b)/;

// Generate a new Error object when an invalid input is provided
const InvalidQuantityInputError = () =>
  new Error(
    'The input measurement must be in the format `<quantity> <unit>` where quantity is an integer or decimal.',
  );

export default class Quantity {
  baseMeasurement: {
    raw: string,
    quantity: number,
    unit: string,
  };

  constructor(baseMeasurement: string) {
    // Input measurement must conform to the regex described above
    if (!BASE_MEASUREMENT_TEST.test(baseMeasurement)) {
      throw InvalidQuantityInputError();
    }

    // Execute regex on the lowercase input
    const measurementFields = BASE_MEASUREMENT_TEST.exec(
      baseMeasurement.toLowerCase(),
    );

    // If the regex failed, throw an error
    if (!measurementFields) {
      throw InvalidQuantityInputError();
    }

    // Store the raw input along with extracted quantity and units
    this.baseMeasurement = {
      raw: baseMeasurement,
      quantity: Number(measurementFields[1]),
      unit: String(measurementFields[3]),
    };
  }

  toOunces(): number {
    return this.convertTo('ounce').toNumber();
  }

  toCups(): number {
    return this.convertTo('cup').toNumber();
  }

  toTablespoons(): number {
    return this.convertTo('tablespoon').toNumber();
  }

  toTeaspoons(): number {
    return this.convertTo('teaspoon').toNumber();
  }

  toPints(): number {
    return this.convertTo('pint').toNumber();
  }

  toQuarts(): number {
    return this.convertTo('quart').toNumber();
  }

  toGallons(): number {
    return this.convertTo('gallon').toNumber();
  }

  convertTo(toUnit: string): Quantity {
    return new Quantity(
      `${ConversionTable.getConversionFactor(
        this.baseMeasurement.unit,
        toUnit,
      ) * this.baseMeasurement.quantity} ${toUnit}`,
    );
  }

  toNumber(): number {
    return Number(this.baseMeasurement.quantity);
  }

  toString(): string {
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
