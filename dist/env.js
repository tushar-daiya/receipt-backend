"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateEnv;
const zod_1 = __importDefault(require("zod"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.default.object({
    PORT: zod_1.default.coerce.number().default(4000),
    NODE_ENV: zod_1.default.enum(["development", "production"]).default("production"),
});
function validateEnv() {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        console.error("Invalid environment variables:", result.error.format());
        process.exit(1);
    }
    return result.data;
}
//# sourceMappingURL=env.js.map