import { Hono } from "hono";

export const lead = new Hono()
  .get('/', (c) => c.json('list leads'))
  .post('/', (c) => c.json('create lead', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

