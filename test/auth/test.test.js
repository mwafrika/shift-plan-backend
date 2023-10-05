// sample test using jest
// https://jestjs.io/docs/en/getting-started.html

import request from "supertest";
import app from "../../app";

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/api/v1");
    expect(response.statusCode).toBe(200);
  });
});
