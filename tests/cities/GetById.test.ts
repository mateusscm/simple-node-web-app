import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - get by id", () => {
  it("should get a city by id", async () => {
    const cityId = 1;
    const res = await testServer.get(`/cities/${cityId}`);

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("id", cityId);
  });

  it("should try to get a city with an invalid id", async () => {
    const res = await testServer.get("/cities/invalid-id");

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });
});
