const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");
const cookieParser = require("cookie-parser");
const server = express();

server.use(helmet());
server.use(cors({
    credentials: true,
	origin: "http://localhost:3000",
}));
server.use(express.json());
server.use(cookieParser());

server.get("/", (req, res) => {
  res.json({
    message: "Welcome!!!",
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate(), jokesRouter);

module.exports = server;
