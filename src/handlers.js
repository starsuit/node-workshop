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
      // console.log(convertedData);

      fs.readFile(
        __dirname + "/.." + "/src/posts.json",
        "utf8",
        (error, data) => {
          if (error) {
            console.log(error);
            return;
          }
          const originalObj = JSON.parse(data);
          const timestamp = Date.now();
          originalObj[timestamp] = convertedData.post;
          const newData = JSON.stringify(originalObj);
          console.log({ originalObj, newData });
          fs.writeFile(
            __dirname + "/.." + "/src/posts.json",
            newData,
            error => {
              if (error) {
                console.log(error);
                return;
              }
            }
          );
        }
      );

      // const addPost = (location, content) => {
      //   fs.readFile(__dirname + "/.." + location, (error, data) => {
      //     if (error) {
      //       console.log(error);
      //       return;
      //     }
      //     console.log(data);
      //   });
      // };

      // addPost("/src/posts.json", convertedData);
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
  } else if (endpoint === "/posts") {
    response.writeHead(200, { "Content-Type": "application/json" });
    fs.readFile(__dirname + "/.." + "/src/posts.json", (error, file) => {
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
