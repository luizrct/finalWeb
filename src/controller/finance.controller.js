import { validationResult } from "express-validator"
import Finance from "../database/model/finance.model.js"
class FinanceController{
    async renderFinance(req, res){
        if(req.session.userId){
            const financas = await Finance.findAll({where: {userId:req.session.userId}})
            res.render("finance_list.ejs", {title:"Finanças", financas:financas})
        }else{
            res.redirect("/login")
        }
    }

    renderNewForm(req, res){
        if(req.session.userId){
            res.render("finance_form.ejs", {title:"Nova Receita", isUpdate:false, showError:false})
        }else{
            res.redirect("/login")
        }
    }

    async createFinance(req, res){
        const result = validationResult(req)
        if(result.isEmpty()){
            const userId = req.session.userId
            const tipo = req.body.tipo
            const valor = parseFloat(req.body.valor.toFixed(2))
            const data = req.body.data
            await Finance.create({"userId":userId, tipo, valor, data})
            res.redirect("/finances")
        }else{
            //Não preencheu todos os itens
            res.render("finance_form.ejs", {title:"Nova Receita", showError:true, isUpdate:false})
        }
    }

    async renderEditForm(req, res){
        if(req.session.userId){
            const id = req.params.id
            const receita = await Finance.findByPk(id)
            //garantindo que o usuário possa acessar somente a suas receitas
            if(req.session.userId == receita.userId){
                //acesso permitido
                res.render("finance_form.ejs", {title:"Editar Receita", showError:false, isUpdate:true, receita})
            }else{
                //acesso negado
                res.redirect("/finances")
            }
        }else{
            res.redirect("/login")
        }
    }
}




export default FinanceController