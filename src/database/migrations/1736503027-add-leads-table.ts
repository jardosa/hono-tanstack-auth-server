import { Kysely, sql } from 'kysely'


export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('lead')
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('first_name', 'varchar', (col) => col.notNull())
    .addColumn('last_name', 'varchar')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute()

  // Create a trigger function to update `updated_at` column on update
  sql`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
`.execute(db)

  // Create a trigger for the `lead` table
  sql`
      CREATE TRIGGER set_updated_at
      BEFORE UPDATE ON lead
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `.execute(db)
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('lead').execute()
}