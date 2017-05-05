import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { API_PORT, MONGO_DB } from './config/config';
import expressConfig from './config/express';
import routesConfig from './config/routes';

class Server {
    constructor() {
        this.app = express();
        this.port = (process.env.NODE_ENV !== 'test') ? process.env.PORT || API_PORT : 3100;

        this.config();
        this.routes();
        this.server();
        Server.mongoose();
    }

    config() {
        this.app.use(morgan('dev'));

        expressConfig(this.app);
    }

    routes() {
        routesConfig(this.app);
    }

    server() {
        this.app.listen(this.port, () => {
            console.info(`[Server] listening on port ${this.port}`);
        });
    }

    static mongoose() {
        mongoose.connect(MONGO_DB, (err) => {
            if (err) {
                console.error(`[MongoDB] Failed to connect. ${err}`);
            } else {
                console.log(`[MongoDB] connected: ${MONGO_DB}`);
            }
        });
    }
}

export default new Server().app;
