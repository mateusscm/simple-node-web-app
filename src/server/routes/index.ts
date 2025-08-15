import { Request, Response, Router } from "express";

import { CitiesController, PeopleController } from "./../controllers";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  return res.send("Hello, World!");
});

router.get(
  "/cities",
  CitiesController.getAllValidation,
  CitiesController.getAll
);
router.get(
  "/cities/:id",
  CitiesController.getByIdValidation,
  CitiesController.getById
);
router.post(
  "/cities",
  CitiesController.createValidation,
  CitiesController.create
);
router.put(
  "/cities/:id",
  CitiesController.updateByIdValidation,
  CitiesController.updateById
);
router.delete(
  "/cities/:id",
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById
);

router.post(
  "/people",
  PeopleController.createValidation,
  PeopleController.create
);

router.get(
  "/people",
  PeopleController.getAllValidation,
  PeopleController.getAll
);

router.get(
  "/people/:id",
  PeopleController.getByValidation,
  PeopleController.getById
);

router.put(
  "/people/:id",
  PeopleController.updateByIdValidation,
  PeopleController.updateById
);

export { router };
