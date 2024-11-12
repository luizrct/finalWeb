import Express from "express"
import router from "../router/index.js"

const express = Express()
const port = 3000

express.use(Express.urlencoded({ bodyParser: true }));
express.use("/public", Express.static("./assets"));
express.set("view engine", "ejs");

express.use("/", router)

export {express, port}