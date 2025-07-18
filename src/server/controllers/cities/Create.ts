import { Request, Response } from "express";
import { CreateCityInput, createCitySchema, filterSchema } from "../../schemas";
import { validation } from "../../shared/middleware";

export const createValidation = validation({
  body: createCitySchema,
  query: filterSchema,
});

export const create = async (
  req: Request<{}, {}, CreateCityInput>,
  res: Response
) => {
  const validatedData: CreateCityInput | undefined = req.body;

  return res.status(200).json({
    message: "City created successfully",
    data: validatedData,
  });
};
