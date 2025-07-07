import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  return res.send("Hello, World!");
});

router.post("/test", (req: Request, res: Response) => {
  console.log(req.body);
  return res.status(StatusCodes.UNAUTHORIZED).json(req.body);
});

export { router };
