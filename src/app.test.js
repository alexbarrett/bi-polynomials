const request = require("supertest");

const { app } = require("./app");

describe("route: /differentiate", () => {
  test("200 status", async () => {
    await request(app)
      .get("/differentiate/1")
      .expect(200)
      .expect("Content-Type", /^text\/plain\b/);
  });

  test("malformed urls", async () => {
    await request(app)
      .get("/differentiate")
      .expect(404);
    await request(app)
      .get("/differentiate/foo")
      .expect(404);
    await request(app)
      .get("/differentiate/1/a/3")
      .expect(404);
  });

  test("differentiating", async () => {
    await request(app)
      .get("/differentiate/4/3/2/1")
      .expect("12x^2+6x+2");
    await request(app)
      .get("/differentiate/3/2/1")
      .expect("6x+2");
    await request(app)
      .get("/differentiate/4/3/0/1")
      .expect("12x^2+6x");
    await request(app)
      .get("/differentiate/4/-5/0/1")
      .expect("12x^2-10x");
  });

  test("differentiating very large coefficients", async () => {
    await request(app)
      .get("/differentiate/671998030559713968361666935769/3/2/1")
      .expect(200); // My calculator app isn't giving me the answer to put in :)
    await request(app)
      .get("/differentiate/-54673257461630679457/4/3/2/1")
      .expect(200);
  });
});
