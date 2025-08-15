import { StatusCodes } from "http-status-codes";
import { testServer, createTestCity, createTestPerson } from "../jest.setup";

describe("People - get all", () => {
  it("should get all people", async () => {
    const cityId = await createTestCity();
    await createTestPerson("John", "Doe", undefined, cityId);

    const resGetAll = await testServer.get("/people");

    expect(Number(resGetAll.header["x-total-count"])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
    expect(resGetAll.body[0]).toHaveProperty("first_name");
    expect(resGetAll.body[0]).toHaveProperty("last_name");
    expect(resGetAll.body[0]).toHaveProperty("email");
    expect(resGetAll.body[0]).toHaveProperty("city_id");
  });
});
