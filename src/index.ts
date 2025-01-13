import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { auth } from './utils/auth.js';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev';
import { lead } from './modules/leads/controllers/lead.route.js';
import migrator from './database/migrate.js';

export const app = new Hono().basePath('/api/')

app.use(
	"/auth/**", // or replace with "*" to enable cors for all routes
	cors({
		origin: "http://localhost:3001", // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

app.get('/', (c) => {
	return c.text('Hello Hono!')
})

app.route('/lead', lead)

const port = process.env.PORT as unknown as number || 3000
console.log(`Server is running on http://localhost:${port}`)

// TODO: Make npm script for this
const { error, results } = await migrator.migrateToLatest()
if (error) console.log('Migration Errors', error)
if (results?.length) console.log('Migration Results', results)


serve({
	fetch: app.fetch,
	port,
})

showRoutes(app, {
	verbose: true,
})