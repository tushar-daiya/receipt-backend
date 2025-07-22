"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    console.log(`[${req.method}]: [${req.path}]: [${new Date().toLocaleTimeString()}]`);
    return next();
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map