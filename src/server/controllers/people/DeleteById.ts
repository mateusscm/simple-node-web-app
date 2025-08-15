import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PeopleProvider } from "../../database/providers/people";
import z from "zod";
import { validation } from "../../shared/middleware";

const paramPersonSchema = z
  .object({
    id: z.string().uuid("Invalid person ID"),
  })
  .strict();

type ParamPersonInput = z.infer<typeof paramPersonSchema>;

export const deleteByIdValidation = validation({
  params: paramPersonSchema,
});

export const deleteById = async (
  req: Request<ParamPersonInput, {}, {}>,
  res: Response
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "Person ID is required",
      },
    });
  }

  const result = await PeopleProvider.deleteById(id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json("Person deleted successfully");
};
