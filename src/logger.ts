import type { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${req.method}]: [${req.path}]: [${new Date().toLocaleTimeString()}]`
  );
  return next();
};
