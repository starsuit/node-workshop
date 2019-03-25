const http = require("http");
const fs = require('fs');

const handler = (request, response) => {
    const endpoint = request.url;
    const method = request.method;
    console.log({endpoint, method});
    if (endpoint === '/'){
        response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/..' + '/public/index.html', (error,file) => {
        if (error) {
            console.log(error);
            return;
        }
        response.end(file);
    })
}
   

}

const server = http.createServer(handler);

const message = "I am so happy to be part of FAC16!"

server.listen(3000, () => {
    console.log("Server is listening on port 3000. Ready to accept requests");
}
);

