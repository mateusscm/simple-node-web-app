import { Request, Response } from "express";
import { CreateCityInput, createCitySchema } from "../../schemas";
import { z } from "zod";

export const create = async (
  req: Request<{}, {}, CreateCityInput>,
  res: Response
) => {
  let validatedData: CreateCityInput | undefined = undefined;

  try {
    validatedData = await createCitySchema.parse(req.body);
  } catch (error) {
    const zodError = error as z.ZodError;
    console.log("Validation error:", zodError.errors);

    return res.status(400).json({
      errors: zodError.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
      })),
    });
  }

  return res.status(200).json({
    message: "City created successfully",
    data: validatedData,
  });
};
