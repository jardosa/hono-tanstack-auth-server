import pg from 'pg'
import { betterAuth } from 'better-auth'
import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(
  import.meta.dirname,
  process.env.NODE_ENV === 'test' ? '../../.env.test' : '../../.env',
);
dotenv.config({ path: envPath });

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:3001'],
  database: new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as unknown as number,
    database: process.env.DB_NAME,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }
  },

})