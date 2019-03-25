const http = require("http");

const handler = (request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(message);
    response.end();
}

const server = http.createServer(handler);

const message = "I am so happy to be part of FAC16!"

server.listen(3000, () => {
    console.log("Server is listening on port 3000. Ready to accept requests");
}
);

