
import { db } from '../../../../database.js'
import type { Lead, LeadUpdate, NewLead } from '../../../../types.js'


export async function findLeadById(id: string) {
  return await db.selectFrom('lead')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findLeads(criteria: Partial<Lead>) {
  let query = db.selectFrom('lead')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.first_name) {
    query = query.where('first_name', '=', criteria.first_name)
  }

  if (criteria.last_name !== undefined) {
    query = query.where(
      'last_name',
      criteria.last_name === null ? 'is' : '=',
      criteria.last_name
    )
  }


  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at)
  }

  if (criteria.updated_at) {
    query = query.where('updated_at', '=', criteria.updated_at)
  }

  return await query.selectAll().execute()
}

export async function updateLead(id: string, updateWith: LeadUpdate) {
  const result = await db.updateTable('lead')
    .set(updateWith)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
  return result
}

export async function createLead(lead: NewLead) {
  return await db.insertInto('lead')
    .values(lead)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deleteLead(id: string) {
  return await db.deleteFrom('lead')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}
