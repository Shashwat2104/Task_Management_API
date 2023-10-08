const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs.txt");

function logRequestSync(req, res, next) {
  const timestamp = new Date().toISOString();
  const { method, url } = req;
  const { statusCode } = res;
  const contentLength = res.getHeader("content-length") || 0;

  const logMessage = `${timestamp} - ${method} ${url} - Status: ${statusCode}, Content Length: ${contentLength} bytes\n`;

  console.log(logMessage);

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });

  next();
}

module.exports = { logRequestSync };
