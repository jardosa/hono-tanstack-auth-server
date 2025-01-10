import type { LeadCreateDto } from '../../dto/LeadCreate.dto.js'
import * as LeadRepository from '../repositories/lead.repository.js'

const leadService = () => {
  const leadRepo = LeadRepository

  const createLead = async (payload: LeadCreateDto) => {
    const newLead = await leadRepo.createLead(payload)

    return newLead
  }

  const findLead = () => {

    console.log('find lead')
  }
  const updateLead = () => {

    console.log('update lead')
  }
  const deleteLead = () => {

    console.log('delete lead')
  }

  return {
    createLead,
    findLead,
    updateLead,
    deleteLead,
  }

}

export default leadService