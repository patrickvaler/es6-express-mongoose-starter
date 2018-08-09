import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config/config';
import expressConfig from './config/express';
import routesConfig from './config/routes';

class Server {
  constructor() {
    this.app = express();
    this.config = config;

    this.init();
  }

  init() {
    // HTTP request logger
    this.app.use(morgan('dev'));

    // express settings
    expressConfig(this.app);

    // connect to database
    mongoose.connect(
      this.config.db,
      err => {
        if (err) {
          console.log(`[MongoDB] Failed to connect. ${err}`);
        } else {
          console.log(`[MongoDB] connected: ${this.config.db}`);

          // initialize api
          routesConfig(this.app);

          // start server
          this.app.listen(this.config.apiPort, () => {
            console.log(`[Server] listening on port ${this.config.apiPort}`);
          });
        }
      }
    );
  }
}

export default new Server().app;
