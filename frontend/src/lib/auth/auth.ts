import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const MONGODB_URI = process.env.MONGODB_URI || "https://example.com/mock-api";

if (!process.env.MONGODB_URI) console.error("MONGODB_URI NOT SET!");

const client = new MongoClient(MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  rateLimit: {
    enabled: true,
    window: 10, // time window in seconds
    max: 100, // max requests in the window
  },
  user: {
    modelName: "users",
    additionalFields: {
      team: {
        type: "string",
        required: true,
        input: true,
      },
      admin: {
        type: "boolean",
        required: true,
        defaultValue: false,
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    /* client: client, */
  }),
  /*   experimental: { joins: true }, */
  plugins: [nextCookies()],
});
