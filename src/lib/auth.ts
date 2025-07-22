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
        console.log(otp)
        // const subject = userExists
        //   ? "Login Verification"
        //   : "Sign Up Verification";
        // const message = `Your verification code is ${otp}.`;
        // const { data, error } = await resend.emails.send({
        //   from: "Receipt - <onboarding@resend.dev>",
        //   to: email,
        //   subject,
        //   text: message,
        // });
        // if (error) {
        //   console.error("Error sending email:", error);
        //   throw new Error("Failed to send verification email");
        // }
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
    "http://192.168.29.225:4000", // Your backend URL
    "receipt://", // Your custom scheme
    "exp://192.168.29.225:8081", // Expo development server
    "http://localhost:4000", // For local development
  ],
});
