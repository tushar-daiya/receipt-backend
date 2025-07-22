import z from "zod";

const receiptSchema = z.object({
  vendor: z.string().min(1, "Vendor is required"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  amount: z.number().min(0, "Amount must be a positive number"),
  category: z.string().min(1, "Category is required"),
  transactionFee: z
    .number()
    .min(0, "Transaction fee must be a positive number"),
  imageKey: z.string(),
});

export { receiptSchema };
