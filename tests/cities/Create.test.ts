import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - create", () => {
  it("should create a new city", async () => {
    const res1 = await testServer.post("/cities").send({
      name: "São Carlos",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("should try to create a short name city", async () => {
    const res2 = await testServer.post("/cities").send({
      name: "Sa",
    });

    expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res2.body).toHaveProperty("errors.body.name");
  });
  // TODO: should try to create a city with no name
});
