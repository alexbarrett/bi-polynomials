const { Polynomial } = require("./polynomial");

test("calculating degree of a polynomial", () => {
  expect(new Polynomial(3).degree).toBe(0);
  expect(new Polynomial(3, 5).degree).toBe(1);
  expect(new Polynomial(3, 5, 1).degree).toBe(2);
});

test("leading zero coefficient does not increase the degree of polynomial", () => {
  const p = new Polynomial(0, 5, 1);
  expect(p.degree).toBe(1);
});

describe("string formatting", () => {
  test("formatting simple polynomials as a string", () => {
    expect(new Polynomial(3).toString()).toBe("3");
    expect(new Polynomial(3, 5).toString()).toBe("3x+5");
    expect(new Polynomial(3, 5, 1).toString()).toBe("3x^2+5x+1");
  });

  test("formatting polynomials with negative coefficients as a string", () => {
    expect(new Polynomial(-3).toString()).toBe("-3");
    expect(new Polynomial(-3, -5).toString()).toBe("-3x-5");
    expect(new Polynomial(-3, 5, -1).toString()).toBe("-3x^2+5x-1");
  });

  test("zero coefficients disappear when polynomial is formatted as a string", () => {
    expect(new Polynomial(3, 0, -5, 0, 1).toString()).toBe("3x^4-5x^2+1");
  });

  test("polynomials with only zero coefficients are displayed as '0' when formatted as a string", () => {
    expect(new Polynomial().toString()).toBe("0");
    expect(new Polynomial(0).toString()).toBe("0");
    expect(new Polynomial(0, 0).toString()).toBe("0");
  });
});

describe("differentiation", () => {
  test("differentiating a polynomial", () => {
    // Jest displays BigInts as {} in its output so it's easier to compare the
    // string format.
    expect(new Polynomial(4, 3, 2, 1).differentiate().toString()).toBe(
      "12x^2+6x+2"
    );
    expect(new Polynomial(3, 2, 1).differentiate().toString()).toBe("6x+2");
    expect(new Polynomial(4, 3, 0, 1).differentiate().toString()).toBe(
      "12x^2+6x"
    );
    expect(new Polynomial(4, -5, 0, 1).differentiate().toString()).toBe(
      "12x^2-10x"
    );
  });

  test("differentiating a polynomial with a single constant term", () => {
    expect(new Polynomial(0).differentiate().toString()).toBe("0");
    expect(new Polynomial(5).differentiate().toString()).toBe("0");
  });

  test("differentiating a polynomial results in a polynomial one degree lower", () => {
    const p = new Polynomial(3, 5, 1);
    const q = p.differentiate();
    expect(p.degree - q.degree).toBe(1);
  });

  test("differentiating polynomials with very large coefficients", () => {
    const big = BigInt("671998030559713968361666935769");
    expect(new Polynomial(big).differentiate().toString()).toBe("0");
    expect(new Polynomial(big, 0).differentiate().toString()).toBe(
      big.toString()
    );
  });
});
