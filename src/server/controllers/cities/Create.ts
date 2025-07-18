import { Request, Response } from "express";
import { CreateCityInput, createCitySchema } from "../../schemas";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";

export const createValidation = validation({
  body: createCitySchema,
});

export const create = async (
  req: Request<{}, {}, CreateCityInput>,
  res: Response
) => {
  console.log(req.body);
  // const validatedData: CreateCityInput | undefined = req.body;

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Not implemented yet");
};
