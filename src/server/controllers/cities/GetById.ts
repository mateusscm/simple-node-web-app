import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validation } from "../../shared/middleware";

import { z } from "zod";

const paramCitySchema = z
  .object({
    id: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().min(1, "City ID must be a positive number")),
  })
  .strict();

type ParamCityInput = z.infer<typeof paramCitySchema>;

export const getByIdValidation = validation({
  params: paramCitySchema,
});

export const getById = async (
  req: Request<ParamCityInput, {}, {}>,
  res: Response
) => {
  console.log(req.params);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Not implemented yet");
};
