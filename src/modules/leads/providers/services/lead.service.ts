
import type { LeadUpdate } from '../../../../types.js'
import type { LeadCreateDto } from '../../dto/LeadCreate.dto.js'
import * as LeadRepository from '../repositories/lead.repository.js'

const leadService = () => {
  const leadRepo = LeadRepository

  const createLead = async (payload: LeadCreateDto) => {
    const newLead = await leadRepo.createLead(payload)

    return newLead
  }

  const getLead = async (id: string) => {
    const lead = await leadRepo.findLeadById(id)

    return lead
  }
  const updateLead = async (id: string, payload: LeadUpdate) => {

    const updatedLead = await leadRepo.updateLead(id, payload)

    return updatedLead
  }
  const deleteLead = () => {

    console.log('delete lead')
  }

  return {
    createLead,
    getLead,
    updateLead,
    deleteLead,
  }

}

export default leadService