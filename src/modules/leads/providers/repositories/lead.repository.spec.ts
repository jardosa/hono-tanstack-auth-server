import { sql } from 'kysely'

import * as LeadRepository from './lead.repository.js'
import { describe, before, afterEach, after, it } from 'node:test'
import { db } from '../../../../database.js'

describe('LeadRepository', () => {
  before(async () => {
    await db.schema.createTable('lead')
      .addColumn('id', 'uuid', (cb) => cb.primaryKey())
      .addColumn('first_name', 'varchar', (cb) => cb.notNull())
      .addColumn('last_name', 'varchar')
      .addColumn('gender', 'varchar(50)', (cb) => cb.notNull())
      .addColumn('created_at', 'timestamp', (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
      .execute()
  })

  afterEach(async () => {
    await sql`truncate table ${sql.table('lead')}`.execute(db)
  })

  after(async () => {
    await db.schema.dropTable('lead').execute()
  })

  it('should find a lead with a given id', async () => {
    await LeadRepository.findLeadById('01944824-cfe3-73b0-9602-3c03dff0bc14')
  })

  it('should find all people named Arnold', async () => {
    await LeadRepository.findLeads({ first_name: 'Arnold' })
  })

  it('should update gender of a lead with a given id', async () => {
    await LeadRepository.updateLead('01944824-cfe3-73b0-9602-3c03dff0bc14', { status: 'qualified' })
  })

  it('should create a lead', async () => {
    await LeadRepository.createLead({
      first_name: 'Jennifer',
      last_name: 'Aniston',
      status: 'new'
    })
  })

  it('should delete a person with a given id', async () => {
    await LeadRepository.deleteLead('01944824-cfe3-73b0-9602-3c03dff0bc14')
  })
})
