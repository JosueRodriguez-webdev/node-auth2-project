const express = require("express");
const userRouter = require("../register/userRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<p>Server is running correctly</p>");
});

//Router
server.use("/api", userRouter);

module.exports = server;
