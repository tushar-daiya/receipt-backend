import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { expo } from "@better-auth/expo";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [expo()],
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
