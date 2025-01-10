import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Ensure the pgcrypto extension is enabled
  sql`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
  `.execute(db)

  // Alter the 'id' column to use gen_random_uuid() as the default value
  sql`
    ALTER TABLE lead
    ALTER COLUMN id
    SET DEFAULT gen_random_uuid();
  `.execute(db)
}

export async function down(db: Kysely<any>): Promise<void> {
  // Revert the default value change for the 'id' column
  sql`
    ALTER TABLE lead
    ALTER COLUMN id
    DROP DEFAULT;
  `

  // Optionally, drop the pgcrypto extension (though not recommended if other parts of your database rely on it)
  // Uncomment the line below if you want to drop it
  // await db.raw(sql`DROP EXTENSION IF EXISTS pgcrypto;`)
}
