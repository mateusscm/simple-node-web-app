import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { z } from "zod";

const paramCitySchema = z
  .object({
    id: z
      .string()
      .regex(/^\d+$/, "City ID must be a valid integer")
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().min(1, "City ID must be a positive number")),
  })
  .strict();

type ParamCityInput = z.infer<typeof paramCitySchema>;

export const deleteByIdValidation = validation({
  params: paramCitySchema,
});

export const deleteById = async (
  req: Request<ParamCityInput, {}, {}>,
  res: Response
) => {
  console.log(req.params);

  return res.status(StatusCodes.NO_CONTENT).send("City deleted successfully");
};
