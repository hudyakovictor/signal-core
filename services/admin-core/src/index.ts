// Admin Core stub — CRM & Remote Config server
// Access restricted to VPN CIDR (see .env.example ADMIN_VPN_ALLOWED_CIDR).

import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/health', async () => ({ status: 'ok' }));

fastify.get('/', async () => {
  return { service: 'admin-core', version: '0.1.0', ready: false };
});

const port = 8081;
await fastify.listen({ port, host: '127.0.0.1' });
fastify.log.info(`Admin core listening on :${port} (localhost only)`);
