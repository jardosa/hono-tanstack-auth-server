import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import z from 'zod'
import leadService from "../providers/services/lead.service.js";
import { leadCreateDto } from "../dto/LeadCreate.dto.js";

export const lead = new Hono()
  .get('/', (c) => c.json('list leads'))
  .post('/', zValidator('json', leadCreateDto), async (c) => {
    const validated = c.req.valid('json')

    const newLead = await leadService().createLead(validated)
    return c.json(newLead)
  })
  .get('/:id', async (c) => {
    const lead = await leadService().getLead(c.req.param('id'))
    return c.json(lead)
  })
  .delete('/:id', (c) => c.json(`delete ${c.req.param('id')}`))
  .put('/:id', (c) => c.json(`update ${c.req.param('id')} with body ${c.req.parseBody()}`))

