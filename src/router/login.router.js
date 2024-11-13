import express from 'express'
import LoginController from '../controller/login.controller.js'

const router = new express.Router()
const loginController = new LoginController()

router.get("/login", loginController.renderLogin)
router.get("/register", loginController.renderRegister)


router.post("/register", body("email").notEmpty().trim().isEmail(), body("password").notEmpty().trim(), loginController.postRegister)
router.post("/login", body("email").notEmpty().trim().isEmail(), body("password").notEmpty().trim(), loginController.postLogin)
export default router