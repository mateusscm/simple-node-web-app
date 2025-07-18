import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { z } from "zod";

const queryCitiesSchema = z
  .object({
    page: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().min(1, "Page number must be at least 1"))
      .optional(),
    limit: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().min(1, "Limit must be at least 1"))
      .optional(),
    filter: z
      .string()
      .min(0, "Filter must be at least 0 characters long")
      .max(50, "Filter must be at most 50 characters long")
      .optional(),
  })
  .strict();

type QueryCitiesInput = z.infer<typeof queryCitiesSchema>;

export const getAllValidation = validation({
  query: queryCitiesSchema,
});

export const getAll = async (
  req: Request<{}, {}, {}, QueryCitiesInput>,
  res: Response
) => {
  console.log(req.query);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Not implemented yet");
};
