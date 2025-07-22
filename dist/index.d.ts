import type { Session, User } from "better-auth";
export declare const env: {
    PORT: number;
    NODE_ENV: "development" | "production";
};
declare global {
    namespace Express {
        interface Request {
            session: Session | null;
            user: User | null;
        }
    }
}
