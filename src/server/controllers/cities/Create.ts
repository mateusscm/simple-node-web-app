import { Request, Response } from "express";
import { CreateCityInput, createCitySchema } from "../../schemas";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export const create = async (
  req: Request<{}, {}, CreateCityInput>,
  res: Response
) => {
  let validatedData: CreateCityInput | undefined = undefined;

  try {
    validatedData = await createCitySchema.parse(req.body);
  } catch (err) {
    const zodError = err as z.ZodError;
    const errors: Record<string, string> = {};

    zodError.errors.forEach((error) => {
      if (!error.path.length) return;
      errors[error.path.join(".")] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }

  return res.status(200).json({
    message: "City created successfully",
    data: validatedData,
  });
};
