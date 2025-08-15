import express from "express";
import validateEnv from "./env";
import { logger } from "./logger";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import helmet from "helmet";
import { auth } from "./lib/auth";
import type { Session, User } from "better-auth";
import receiptsRouter from "./routes/receipts.router";
import walletRouter from "./routes/wallet.router";

export const env = validateEnv();
const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(cors());
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger);
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/receipts", receiptsRouter);

app.use("/api/wallet", walletRouter);
console.log("Is DATABASE_URL loaded?", process.env.DATABASE_URL);
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

declare global {
  namespace Express {
    interface Request {
      session: Session | null;
      user: User | null;
    }
  }
}
