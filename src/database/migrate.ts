import { FileMigrationProvider, Migrator } from "kysely"

import { promises as fs } from 'fs'
import * as path from 'path'
import { db } from "../database.js"

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    // This needs to be an absolute path.
    migrationFolder: path.join(import.meta.dirname, 'migrations'),
  }),
})

export default migrator