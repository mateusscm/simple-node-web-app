import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - delete", () => {
  it("should delete a city by id", async () => {
    const resCreated = await testServer.post("/cities").send({
      name: "Test City",
    });

    expect(resCreated.statusCode).toEqual(StatusCodes.CREATED);

    const cityId = resCreated.body;
    const resDeleted = await testServer.delete(`/cities/${cityId}`);

    expect(resDeleted.statusCode).toEqual(StatusCodes.OK);
    expect(resDeleted.body).toEqual("City deleted successfully");
  });

  it("should try to delete a city with an invalid id", async () => {
    const res3 = await testServer.delete("/cities/invalid-id");

    expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
});
