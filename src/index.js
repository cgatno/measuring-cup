// @flow

import Quantity from './lib/Quantity';

/**
 * Create a new Quantity object to access conversion functions.
 * @param {string} inputMeasurement The base measurement to convert from in the form <quantity> <unit>.
 * For example, 12 cups. Quantities can be integers or decimals, so 15.5 tablespoons is also
 * acceptable. The interpreter also understands most abbreviated units, e.g. 1 oz.
 */
module.exports = (inputMeasurement: string) => new Quantity(inputMeasurement);
