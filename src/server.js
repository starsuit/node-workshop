const http = require("http");
const handler = require("./handlers");

const server = http.createServer(handler);
server.listen(3060, () => {
  console.log("Server is listening on port 3060. Ready to accept requests");
});
