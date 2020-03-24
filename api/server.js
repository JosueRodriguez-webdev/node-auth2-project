const express = require("express");
const helmet = require("helmet");
const userRouter = require("../register/userRouter");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<p>Server is running correctly</p>");
});

//Router
server.use("/api", userRouter);

module.exports = server;
