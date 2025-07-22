"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("./prisma");
const prisma_2 = require("better-auth/adapters/prisma");
const expo_1 = require("@better-auth/expo");
const plugins_1 = require("better-auth/plugins");
const resend_1 = __importDefault(require("./resend"));
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_2.prismaAdapter)(prisma_1.prisma, {
        provider: "postgresql",
    }),
    emailVerification: {
        autoSignInAfterVerification: true,
    },
    plugins: [
        (0, expo_1.expo)(),
        (0, plugins_1.emailOTP)({
            async sendVerificationOTP({ email, otp, type }) {
                const userExists = await prisma_1.prisma.user.findUnique({
                    where: { email },
                });
                const subject = userExists
                    ? "Login Verification"
                    : "Sign Up Verification";
                const message = `Your verification code is ${otp}.`;
                const { data, error } = await resend_1.default.emails.send({
                    from: "Receipt - <onboarding@resend.dev>",
                    to: email,
                    subject,
                    text: message,
                });
                if (error) {
                    console.error("Error sending email:", error);
                    throw new Error("Failed to send verification email");
                }
            },
        }),
    ],
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [
        process.env.BACKEND_URL,
        process.env.MOBILE_APP,
        process.env.MOBILE_EXPO,
    ],
});
//# sourceMappingURL=auth.js.map