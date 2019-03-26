const http = require("http");
const fs = require("fs");
const querystring = require("querystring");

const handler = (request, response) => {
  const endpoint = request.url;
  if (request.method === "POST") {
    let allTheData = "";
    request.on("data", chunkOfData => {
      allTheData += chunkOfData;
    });
    request.on("end", () => {
      const convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.end();
    });
  }
  if (endpoint === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(__dirname + "/.." + "/public/index.html", (error, file) => {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else if (endpoint === "/create/post") {
    response.writeHead(301, { Location: "/" });
    fs.readFile(__dirname + "/.." + "/public/index.html", (error, file) => {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else if (endpoint.indexOf("public") != -1) {
    const extension = endpoint.split(".")[1];
    const extensionType = {
      html: "text/html",
      css: "text/css",
      js: "application/javascript",
      jpg: "image/jpeg",
      png: "image/png"
    };
    fs.readFile(__dirname + "/.." + endpoint, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, { "Content-Type": extensionType[extension] });
        response.end(file);
      }
    });
  } else {
    response.writeHead(404);
    response.end("404 not found");
  }
};

module.exports = handler;
