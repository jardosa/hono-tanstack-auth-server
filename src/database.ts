import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import type { Database } from './types.js'

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: process.env.DB_PORT as unknown as number,
    password: process.env.DB_PASSWORD,
    max: 10,
  })
})


export const db = new Kysely<Database>({
  dialect,
})
