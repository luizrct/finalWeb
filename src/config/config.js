import Express from "express"
import router from "../router/index.js"
import session from "express-session"
const express = Express()
const port = 3000

express.use(Express.urlencoded({ bodyParser: true }))
express.use("/public", Express.static("./assets"))
express.use(session({
    secret: 'chave-secreta', // Use uma chave única e segura
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 ano (em milissegundos)
      httpOnly: true, // Protege contra acesso via JavaScript no navegador
      secure: false // Use `true` em produção com HTTPS
    }
}))

express.set("view engine", "ejs")



express.use("/", router)

export {express, port}