// libraries
const express = require("express");

// global objects
const server = express();

// imports
// const logger = require("./components/middleware/logger.js");
// const projectRouter = require("./components/routers/projectRouter.js");
// const actionRouter = require("./components/routers/actionRouter.js");
const welcomeRouter = require("./components/routers/welcomeRouter.js");

// middleware
// server.use(logger);
server.use(express.json());

// routes
server.use(welcomeRouter)
// server.use("/api/projects", projectRouter);
// server.use("/api/actions", actionRouter);

// placed the below code in welcomeRouter
    // server.get("/", (req, res) => {
    // 	res.send(`<h2>Node Web API Sprint Challenge!</h2>`);
    // });


// error middleware catches all prev. middleware errors, so place last in file
// server.use((err, req, res, next) => {
	// console.log(err)
	// res.status(500).json({
	// 	message: "Something when wrong, try again later",
	// })
// })

module.exports = server;