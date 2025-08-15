import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PeopleProvider } from "../../database/providers/people";
import z from "zod";
import { validation } from "../../shared/middleware";

const paramsPersonSchema = z
  .object({
    id: z.string().uuid("Invalid person ID"),
  })
  .strict();

type ParamPersonInput = z.infer<typeof paramsPersonSchema>;

export const getByValidation = validation({
  params: paramsPersonSchema,
});

export const getById = async (
  req: Request<ParamPersonInput, {}, {}>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "Person ID is required",
      },
    });
  }

  const person = await PeopleProvider.getById(req.params.id);
  if (person instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: person.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(person);
};
