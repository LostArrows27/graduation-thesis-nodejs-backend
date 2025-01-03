import chalk from "chalk";

export const colorizeRequest = (method: string | undefined): string => {
  switch (method?.toUpperCase()) {
    case "GET":
      return chalk.bgGreen.white(` ${method} `);
    case "POST":
      return chalk.bgYellow.white(` ${method} `);
    case "PUT":
      return chalk.bgBlue.white(` ${method} `);
    case "DELETE":
      return chalk.bgRed.white(` ${method} `);
    case "PATCH":
      return chalk.bgMagenta.white(` ${method} `);
    case "OPTIONS":
      return chalk.bgCyan.white(` ${method} `);
    case "HEAD":
      return chalk.bgGray.white(` ${method} `);
    default:
      return chalk.bgBlack.white(` ${method} `);
  }
};
