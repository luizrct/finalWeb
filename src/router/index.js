import express from 'express'
import loginRouter from './login.router.js'

const router = express.Router()

router.use(loginRouter)

export default router