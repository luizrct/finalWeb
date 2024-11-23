

class FinanceController{
    renderFinance(req, res){
        if(req.session.userId){
            res.render("finance_list.ejs", {title:"Finanças"})
        }else{
            res.redirect("/login")
        }
    }
}

export default FinanceController