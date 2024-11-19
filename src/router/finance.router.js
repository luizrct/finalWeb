import express from 'express'
import {body} from 'express-validator'
import FinanceController from '../controller/finance.controller.js'

const router = new express.Router
const financeController = new FinanceController()

router.get("/finances", financeController.renderFinance)


export default router
