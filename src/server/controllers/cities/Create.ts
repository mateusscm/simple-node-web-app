import { Request, Response } from "express";

interface ICity {
  name: string;
}

export const create = (req: Request<{}, {}, ICity>, res: Response) => {
  const data = req.body;

  console.log(data);

  return res.send("Create city endpoint");
};
