import http from "http"
import express from "express"
import config from "./common/config";
import BaseRouter from "./api/BaseRouter";

function createExpress(): express.Application {
  const app = express();
  const baseRouter = BaseRouter();
  app.use(express.json())
  app.use(baseRouter);
  return app;
}

function startApp (): http.Server {
  const app = createExpress();
  const server = http.createServer(app);
  server.listen(config.port);
  server.on('listening', () => {
    console.info(`Server started on port ${config.port}`, {});
  });
  server.on('error', (error) => {
    console.error(error);
    process.exit(1);
  });
  return server;
}

export default startApp