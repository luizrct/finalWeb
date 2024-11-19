

class FinanceController{
    renderFinance(req, res){
        res.render("finance_list.ejs", {title:"Finanças"})
    }
}

export default FinanceController