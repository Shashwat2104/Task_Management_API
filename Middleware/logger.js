const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs.txt");

// Middleware function for logging incoming requests
function logRequestSync(req, res, next) {
  const timestamp = new Date().toISOString();
  const { method, url } = req;
  const { statusCode } = res;
  const contentLength = res.getHeader("content-length") || 0;

  const logMessage = `${timestamp} - ${method} ${url} - Status: ${statusCode}, Content Length: ${contentLength} bytes\n`;

  // Log the request information to the console
  console.log(logMessage);

  // Append the request information to the log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      // Handle any errors that occur while writing to the log file
      console.error("Error writing to log file:", err);
    }
  });

  next(); // Continue with the next middleware or route handler
}

module.exports = { logRequestSync };
