"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authmiddleware = void 0;
const auth_1 = require("../lib/auth");
const node_1 = require("better-auth/node");
const authmiddleware = async (req, res, next) => {
    try {
        const session = await auth_1.auth.api.getSession({
            headers: (0, node_1.fromNodeHeaders)(req.headers),
        });
        if (!session) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        req.session = session.session;
        req.user = session.user;
        next();
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.authmiddleware = authmiddleware;
//# sourceMappingURL=auth.middleware.js.map