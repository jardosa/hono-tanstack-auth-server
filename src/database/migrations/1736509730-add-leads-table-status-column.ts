import { Kysely, sql } from 'kysely'
import type { Lead } from '../../types.js'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('lead')
    .addColumn('status', 'varchar')
    .execute()

  // Create a trigger function to update `updated_at` column on update

}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('lead')
    .dropColumn('status')
}