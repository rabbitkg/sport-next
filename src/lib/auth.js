import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("sportNest");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET, // ← ADD THIS
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
      google: { 
          clientId: process.env.GOOGLE_CLIENTID,
          clientSecret: process.env.GOOGLE_SECRET
        }, 
    },
    session: {
      cookieCache: {
        enabled: true,
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60
      }
    },
    plugins: [
      jwt()
    ]
});

