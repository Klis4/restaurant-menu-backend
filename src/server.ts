import startApp from "./app.js";

process.on('exit', (code) => {
  console.error(`About to exit with code: ${code}`);
});

process.on('unhandledRejection', (error: Error) => {
  console.error(error);
});

process.on('uncaughtException', (error: Error) => {
  console.error(error);
});

process.on('multipleResolves', (type, promise, reason) => {
  console.error({ type, promise, reason });
});

function startServer (): void {
  startApp()
}

startServer();