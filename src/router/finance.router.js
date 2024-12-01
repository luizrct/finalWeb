import express from 'express'
import {body} from 'express-validator'
import FinanceController from '../controller/finance.controller.js'

const router = new express.Router
const financeController = new FinanceController()

router.get("/finances", financeController.renderFinance)
router.get("/finance/new", financeController.renderNewForm)
router.get("/finance/:id/update", financeController.renderEditForm)

router.post("/finance/new", body("tipo").notEmpty(), body("valor").notEmpty().isNumeric(), body("data").notEmpty(), financeController.createFinance)

export default router
