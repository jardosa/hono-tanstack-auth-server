import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import z from 'zod'
import leadService from "../providers/services/lead.service.js";
import { leadCreateDto } from "../dto/LeadCreate.dto.js";

export const lead = new Hono()
  .get('/', (c) => c.json('list leads'))
  .post('/', zValidator('json', leadCreateDto), (c) => {
    const validated = c.req.valid('json')

    const newLead = leadService().createLead(validated)

    return c.json(newLead)
  })
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))
  .delete('/:id', (c) => c.json(`delete ${c.req.param('id')}`))
  .put('/:id', (c) => c.json(`update ${c.req.param('id')} with body ${c.req.parseBody()}`))

