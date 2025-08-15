import { StatusCodes } from "http-status-codes";
import { testServer, createTestCity, createTestPerson } from "../jest.setup";

describe("People - delete", () => {
  it("should delete a person by id", async () => {
    const cityId = await createTestCity();
    const personId = await createTestPerson("John", "Doe", undefined, cityId);

    const resDeleted = await testServer.delete(`/people/${personId}`);

    expect(resDeleted.statusCode).toEqual(StatusCodes.OK);
    expect(resDeleted.body).toEqual("Person deleted successfully");
  });

  it("should try to delete a person with an invalid id", async () => {
    const res = await testServer.delete("/people/invalid-id");

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });
});
