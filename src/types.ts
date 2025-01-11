import type { Insertable, Selectable, Updateable } from "kysely";
import type { ColumnType } from "kysely";
import type { Generated } from "kysely"

export interface Database{
  lead: LeadTable
}

export interface LeadTable {
  id: Generated<string>

  first_name: string;
  last_name: string;
  email: string;

  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
  status: 'new' | 'qualified' | 'non-responsive';
}

export type Lead = Selectable<LeadTable>
export type NewLead = Insertable<LeadTable>
export type LeadUpdate = Updateable<LeadTable>
