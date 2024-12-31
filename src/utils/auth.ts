import pg from 'pg'
import { betterAuth } from 'better-auth'
import * as dotenv from 'dotenv';
import * as path from 'path';
import { emailOTP, twoFactor } from 'better-auth/plugins';

const envPath = path.resolve(
  import.meta.dirname,
  process.env.NODE_ENV === 'test' ? '../../.env.test' : '../../.env',
);
dotenv.config({ path: envPath });

export const auth = betterAuth({
  appName: process.env.BETTER_AUTH_APP_NAME ?? 'test',
  trustedOrigins: ['http://localhost:3001'],
  database: new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as unknown as number,
    database: process.env.DB_NAME,
  }),
  plugins: [
    twoFactor(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Implement the sendVerificationOTP method to send the OTP to the user's email address
      },
    })
  ],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log({ user, url })
    }
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }
  },
  advanced: {
    cookiePrefix: process.env.BETTER_AUTH_COOKIE_PREFIX
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log({ user, url, token })
    },
    sendOnSignUp: true
  },
  account: {
    accountLinking: {
      enabled: true
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache duration in seconds
    }
  },

})
