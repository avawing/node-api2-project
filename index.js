const express = require("express");
const db = require("./data/db");
const postRoutes = require("./postRoutes")
const server = express();

server.use("/api/posts", postRoutes)




server.use("/", (req, res) => res.send("API up and running!"));
server.listen(9000, () => console.log("API running on port 9000"));
