import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { expo } from "@better-auth/expo";
import { emailOTP } from "better-auth/plugins";
import resend from "./resend";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailVerification: {
    autoSignInAfterVerification: true,
  },

  plugins: [
    expo(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const userExists = await prisma.user.findUnique({
          where: { email },
        });
        const subject = userExists
          ? "Login Verification"
          : "Sign Up Verification";
        const message = `Your verification code is ${otp}.`;
        const { data, error } = await resend.emails.send({
          from: "Receipt - <onboarding@resend.dev>",
          to: email,
          subject,
          text: message,
        });
        if (error) {
          console.error("Error sending email:", error);
          throw new Error("Failed to send verification email");
        }
        // const subject =
        //   type === "sign-in" ? "Sign Up Verification" : "Login Verification";
        // const message = `Your verification code is ${otp}.`;
        // if (type === "sign-in" && !userExists) {
        //   const { data, error } = await resend.emails.send({
        //     from: "Receipt - <onboarding@resend.dev>",
        //     to: email,
        //     subject,
        //     text: message,
        //   });
        //   if (error) {
        //     console.error("Error sending email:", error);
        //     throw new Error("Failed to send verification email");
        //   }

        //   return;
        // } else if (type === "email-verification" && userExists) {
        //   const { data, error } = await resend.emails.send({
        //     from: "Receipt - <onboarding@resend.dev>",
        //     to: email,
        //     subject,
        //     text: message,
        //   });
        //   if (error) {
        //     console.error("Error sending email:", error);
        //     throw new Error("Failed to send verification email");
        //   }
        //   return;
        // }
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    process.env.BACKEND_URL as string, // Your backend URL
    process.env.MOBILE_APP as string, // Your custom scheme
    process.env.MOBILE_EXPO as string, // For local development
  ],
});
