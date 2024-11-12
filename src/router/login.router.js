import express from 'express'
import LoginController from '../controller/login.controller.js'

const router = new express.Router()
const loginController = new LoginController()

router.get("/login", loginController.renderLogin)

export default router