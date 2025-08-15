import { StatusCodes } from "http-status-codes";
import { testServer, createTestCity, createTestPerson } from "../jest.setup";

describe("People - update by id", () => {
  it("should update a person by id", async () => {
    const cityId = await createTestCity();
    const personId = await createTestPerson("John", "Doe", undefined, cityId);

    const updatedEmail = `updated.john.doe.${Date.now()}@example.com`;
    const res = await testServer.put(`/people/${personId}`).send({
      first_name: "John Updated",
      last_name: "Doe Updated",
      email: updatedEmail,
      city_id: cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toEqual(personId);
  });

  it("should try to update a person with an invalid id", async () => {
    const res = await testServer.put("/people/invalid-id").send({
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      city_id: "some-city-id",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });

  it("should try to update a person with invalid data", async () => {
    const cityId = await createTestCity();
    const personId = await createTestPerson("John", "Doe", undefined, cityId);

    const res = await testServer.put(`/people/${personId}`).send({
      first_name: "J", // Too short
      last_name: "Doe",
      email: "invalid-email",
      city_id: cityId,
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors");
  });

  it("should try to update a person with non-existent city", async () => {
    const cityId = await createTestCity();
    const personId = await createTestPerson("John", "Doe", undefined, cityId);

    const res = await testServer.put(`/people/${personId}`).send({
      first_name: "John",
      last_name: "Doe",
      email: `john.doe.${Date.now()}@example.com`,
      city_id: "non-existent-city-id",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.city_id");
  });
});
