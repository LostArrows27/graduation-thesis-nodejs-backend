import { pino } from "pino";
import pinoHttp from "pino-http";
import { config } from "../../configs/setting";

export const logger = pino({
  level: config.logLevel,

  transport:
    config.node_env !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname,req,res,responseTime",
          },
        }
      : undefined,
});

export const pinoHttpLogger = pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} completed - status ${res.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    return `Request ${req.method} ${req.url} failed - status ${res.statusCode}: ${err.message}`;
  },
  serializers: {
    req: () => undefined,
    res: () => undefined,
  },
});