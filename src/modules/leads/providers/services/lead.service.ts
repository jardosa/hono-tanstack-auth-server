
import type { LeadCreateDto, LeadUpdateDto } from '../../dto/index.js'
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
  const updateLead = async (id: string, payload: LeadUpdateDto) => {

    const updatedLead = await leadRepo.updateLead(id, payload)

    return updatedLead
  }
  const deleteLead = async (id: string) => {

    const deletedLead = await leadRepo.deleteLead(id)
    return deletedLead
  }

  return {
    createLead,
    getLead,
    updateLead,
    deleteLead,
  }

}

export default leadService