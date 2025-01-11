import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .alterTable('lead')
    .addUniqueConstraint('UNIQUE_EMAIL', ['email'])
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  db.schema
    .alterTable('lead')
    .dropConstraint('UNIQUE_EMAIL')
    .execute()
}
