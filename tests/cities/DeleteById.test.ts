import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - delete", () => {
  it("should delete a city by id", async () => {
    const cityId = 1;
    const res2 = await testServer.delete(`/cities/${cityId}`);

    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("should try to delete a city with an invalid id", async () => {
    const res3 = await testServer.delete("/cities/invalid-id");

    expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res3.body).toHaveProperty("errors.params.id");
  });
});
