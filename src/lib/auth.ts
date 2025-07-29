import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { expo } from "@better-auth/expo";
import { customSession, emailOTP, username } from "better-auth/plugins";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    autoSignInAfterVerification: true,
  },
  plugins: [
    username(),
    expo(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        try {
          const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              accept: "application/json",
              "api-key": process.env.BREVO_API_KEY as string,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              sender: {
                name: "NA",
                email: "hellotushar67@gmail.com",
              },
              to: [
                {
                  email: email,
                  name: "User",
                },
              ],
              subject: "Sign Up Verification",
              htmlContent:
                "<p>Your verification code is <strong>" +
                otp +
                "</strong>.</p>",
            }),
          });
          console.log("Response from Brevo:", await response.json());
        } catch (error) {
          console.error("Error sending email:", error);
          throw new Error("Failed to send verification email");
        }
      },
    }),
    customSession(async ({ user, session }) => {
      const userDetails = await prisma.user.findUnique({
        where: { id: user.id },
        select: { username: true },
      });
      return {
        user: {
          ...user,
          username: userDetails?.username,
        },
        session,
      };
    }),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
  },

  trustedOrigins: [
    process.env.BACKEND_URL as string, // Your backend URL
    process.env.MOBILE_APP as string, // Your custom scheme
    process.env.MOBILE_EXPO as string, // For local development
  ],
});
