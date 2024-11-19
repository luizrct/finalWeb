import express from 'express'
import loginRouter from './login.router.js'
import financeRouter from './finance.router.js'

const router = express.Router()
router.use(loginRouter)
router.use(financeRouter)
export default router