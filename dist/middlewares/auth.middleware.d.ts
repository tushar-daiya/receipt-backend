import type { NextFunction, Request, Response } from "express";
export declare const authmiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
