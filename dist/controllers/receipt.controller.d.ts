import type { Request, Response } from "express";
declare const listReceipts: (req: Request, res: Response) => Promise<void>;
declare const getReceiptById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getPresignedUrl: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const addReceipt: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { listReceipts, getReceiptById, getPresignedUrl, addReceipt };
