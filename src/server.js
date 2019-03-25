const http = require("http");
const fs = require('fs');

const handler = (request, response) => {
    console.log(request);
    const endpoint = request.url;
    const method = request.method;
    console.log({endpoint});
    if (endpoint === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/..' + '/public/index.html', (error,file) => {
        if (error) {
            console.log(error);
            return;
        }
        response.end(file);
    })
} else if (endpoint.indexOf("public") != -1) {
    const extension = endpoint.split(".")[1];
    console.log(extension);
    const extensionType = {
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        jpg: "image/jpeg"
    }
    fs.readFile(__dirname + '/..' + endpoint, (error,file) => {
        if (error) {
            console.log(error);
            return;
        } else {
            response.writeHead(200, {"Content-Type": extensionType[extension]});
            response.end(file);
        }
        
});
} else {
    response.writeHead(404);
    response.end("404 not found");
};
}

const server = http.createServer(handler);

const message = "I am so happy to be part of FAC16!"

server.listen(3060, () => {
    console.log("Server is listening on port 3050. Ready to accept requests");
}
);

