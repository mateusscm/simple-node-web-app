import { z } from "zod";

export const createCitySchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, "City name must be at least 3 characters long")
      .max(50, {
        message: "City name must be between 3 and 50 characters long",
      }),
  })
  .strict();

export type CreateCityInput = z.infer<typeof createCitySchema>;
