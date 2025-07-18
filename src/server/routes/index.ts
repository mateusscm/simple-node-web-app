import { Request, Response, Router } from "express";

import { CitiesController } from "./../controllers";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  return res.send("Hello, World!");
});

router.post(
  "/cities",
  CitiesController.createValidation,
  CitiesController.create
);

export { router };
