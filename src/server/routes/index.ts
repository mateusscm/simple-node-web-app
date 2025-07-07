import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CitiesController } from "./../controllers";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  return res.send("Hello, World!");
});

router.post("/cities", CitiesController.create);

export { router };
