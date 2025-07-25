import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - update by id", () => {
  it("should update a city by id", async () => {
    const resCreated = await testServer.post("/cities").send({
      name: "Test City",
    });

    expect(resCreated.statusCode).toEqual(StatusCodes.CREATED);

    const cityId = resCreated.body;
    const res = await testServer.put(`/cities/${cityId}`).send({
      name: "Updated City Name",
    });
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toEqual(cityId);
  });

  it("should try to update a city with an invalid id", async () => {
    const res = await testServer.put("/cities/invalid-id").send({
      name: "Updated City Name",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
});
