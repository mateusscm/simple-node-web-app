import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - update by id", () => {
  it("should update a city by id", async () => {
    const cityId = 1;
    const res = await testServer.put(`/cities/${cityId}`).send({
      name: "Updated City Name",
    });

    expect(res.statusCode).toEqual(StatusCodes.OK);
  });

  it("should try to update a city with an invalid id", async () => {
    const res = await testServer.put("/cities/invalid-id").send({
      name: "Updated City Name",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });

  it("should try to send an invalid body when updating a city", async () => {
    const cityId = 1;
    const res = await testServer.put(`/cities/${cityId}`).send({
      name: "",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });

  it("should try to update a city with a short name", async () => {
    const cityId = 1;
    const res = await testServer.put(`/cities/${cityId}`).send({
      name: "Sa",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.name");
  });
});
