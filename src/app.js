const express = require("express");
const app = express();

const { Polynomial } = require("./polynomial");

app.get(/^\/differentiate((?:\/(-?\d+))+)\/?$/, (req, res) => {
  const coeffs = req.params[0]
    .split("/")
    .slice(1)
    .map(BigInt);
  const p = new Polynomial(...coeffs);
  res.type("text/plain");
  res.send(p.differentiate().toString());
});

module.exports = {
  app
};
