import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - get all", () => {
  it("should get all cities", async () => {
    const resCreated = await testServer.post("/cities").send({
      name: "Test City",
    });

    expect(resCreated.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer.get("/cities");

    expect(Number(resGetAll.header["x-total-count"])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
  });
});
