import * as LeadRepository from '../repositories/lead.repository.js'

const leadService = () => {
  const leadRepo = LeadRepository

  const createLead = () => {

    console.log('create lead')
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