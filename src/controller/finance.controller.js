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
}

export default FinanceController