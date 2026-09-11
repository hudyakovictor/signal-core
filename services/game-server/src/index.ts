// Game Server stub — Zero-Client-Trust gateway
// Will be expanded in Phase 1 to validate Telegram initData and compute battle outcomes.

import Fastify from 'fastify';
import websocket from '@fastify/websocket';

const fastify = Fastify({ logger: true });
await fastify.register(websocket);

fastify.get('/health', async () => ({ status: 'ok' }));

fastify.get('/', async () => {
  return { service: 'game-server', version: '0.1.0', ready: false };
});

const port = Number(process.env.GAME_SERVER_PORT) || 8080;
await fastify.listen({ port, host: '0.0.0.0' });
fastify.log.info(`Game server listening on :${port}`);
