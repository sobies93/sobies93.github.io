const { createLogger, format, transports } = require("winston");
const { printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${message}`;
});

const logger = createLogger({
  level: "debug",
  format: customFormat,
  transports: [new transports.Console()],
});

module.exports = logger;

const { argv } = require("node:process");

const [, , client] = argv;

logger.debug(client);