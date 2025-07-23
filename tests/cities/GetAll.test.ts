import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - get all", () => {
  it("should get all cities", async () => {
    const res = await testServer.get("/cities");

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
