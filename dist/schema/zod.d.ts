import z from "zod";
declare const receiptSchema: z.ZodObject<{
    vendor: z.ZodString;
    date: z.ZodString;
    amount: z.ZodNumber;
    category: z.ZodString;
    transactionFee: z.ZodNumber;
    imageKey: z.ZodString;
}, z.core.$strip>;
export { receiptSchema };
