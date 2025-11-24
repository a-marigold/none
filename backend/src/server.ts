import { buildApp } from './app';

const PORT = Number(process.env.PORT) || 1000;

function start() {
    const app = buildApp();

    try {
        app.listen({ port: PORT, host: '0.0.0.0' });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();
