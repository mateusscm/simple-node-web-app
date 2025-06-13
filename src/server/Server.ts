import express, { Request, Response } from "express";

const server = express();

server.get("/", (_: Request, res: Response) => {
  return res.send("Hello, World!");
});

export { server };
