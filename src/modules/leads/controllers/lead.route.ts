import { Hono } from "hono";

export const lead = new Hono()
  .get('/', (c) => c.json('list leads'))
  .post('/', (c) => c.json('create lead', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))
  .delete('/:id', (c) => c.json(`delete ${c.req.param('id')}`))
  .put('/:id', (c) => c.json(`update ${c.req.param('id')} with body ${c.req.parseBody()}`))

