"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./env"));
const logger_1 = require("./logger");
const node_1 = require("better-auth/node");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_1 = require("./lib/auth");
const receipts_router_1 = __importDefault(require("./routes/receipts.router"));
exports.env = (0, env_1.default)();
const app = (0, express_1.default)();
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use((0, cors_1.default)());
app.all("/api/auth/{*any}", (0, node_1.toNodeHandler)(auth_1.auth));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use(logger_1.logger);
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/receipts", receipts_router_1.default);
app.listen(exports.env.PORT, () => {
    console.log(`Server is running on port ${exports.env.PORT} in ${exports.env.NODE_ENV} mode`);
});
//# sourceMappingURL=index.js.map