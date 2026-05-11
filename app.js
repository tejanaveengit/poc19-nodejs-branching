const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.end("Welcome to CI/CD NodeJS Demo 🚀");
  } else if (req.url === "/health") {
    res.end("Application is healthy ✅");
  } else if (req.url === "/about") {
    res.end("This is a simple Node.js CI/CD app.");
  } else {
    res.statusCode = 404;
    res.end("Page not found ❌");
  }
});
