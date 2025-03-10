import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { auth } from './utils/auth.js';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev';
import { lead } from './modules/leads/controllers/lead.route.js';
import migrator from './database/migrate.js';

export const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null,
		session: typeof auth.$Infer.Session.session | null
	}
}>().basePath('/api/')

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session) {
		c.set("user", null);
		c.set("session", null);
		return next();
	}

	c.set("user", session.user);
	c.set("session", session.session);
	return next();
});

app.use('*', cors({
	origin: "http://localhost:3001", // replace with your origin
	allowHeaders: ["Cookie", "Content-Type", "Authorization", "credential"],
	allowMethods: ["POST", "GET", "OPTIONS"],
	exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
	maxAge: 600,
	credentials: true,
}))


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

app.get("/session", async (c) => {
	const session = c.get("session")
	const user = c.get("user")

	console.log(session, user)
	if (!user) return c.body(null, 401);

	return c.json({
		session,
		user
	});
});

app.use('/lead/*', async (c, next) => {

	const user = c.get("user")
	if (!user) return c.body(null, 401);
	console.log({ user })

	return next()
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
