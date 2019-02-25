/**
 * Represents a polynomial.
 *
 * Internally the polynomial is represented as an array of coefficients, with
 * the exponent for each coefficient being inferred by its position in the
 * array.
 */
class Polynomial {
  /**
   * @param {number[]} coefficients
   */
  constructor(...coefficients) {
    // Leading zero coefficients can be ignored.
    const firstNonZero = coefficients.findIndex(c => c != 0);
    this.coefficients = coefficients.slice(firstNonZero).map(BigInt);
    // Internal array should never be zero length.
    if (this.coefficients.length < 1) {
      this.coefficients = [0];
    }
  }

  /**
   * @returns {number}
   */
  get degree() {
    return this.coefficients.length - 1;
  }

  /**
   * @returns {Polynomial}
   */
  differentiate() {
    const xs = this.coefficients
      .slice(0, -1)
      .map((c, i) => c * BigInt(this.degree - i));
    return new Polynomial(...xs);
  }

  /**
   * @returns {string}
   */
  toString() {
    return (
      this.coefficients.reduce((str, c, i) => {
        // We always need to output a sign between terms, but if the coefficient
        // is negative then displaying it as a string handles that for us.
        const sign = c >= 0 && i > 0 ? "+" : "";
        if (c != 0) {
          str += sign + c;
          const exp = this.degree - i;
          if (exp > 0) {
            str += "x";
          }
          if (exp > 1) {
            str += `^${exp}`;
          }
        }
        return str;
      }, "") || "0"
    );
  }
}

module.exports = {
  Polynomial
};
