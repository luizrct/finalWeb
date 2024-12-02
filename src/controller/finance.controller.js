import { validationResult } from "express-validator"
import Finance from "../database/model/finance.model.js"
class FinanceController{
    async renderFinance(req, res){
        if(req.session.userId){
            const financas = await Finance.findAll({where: {userId:req.session.userId}, order: [['id', 'ASC']]})
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
            var valor = parseFloat(req.body.valor)
            valor = valor.toFixed(2)
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


    async updateFinance(req, res){
       const result = validationResult(req)
       const idReceita = req.params.id
       if(result.isEmpty()){
            const idUsuario = req.session.userId
            const tipo = req.body.tipo
            const valor = req.body.valor
            const data = req.body.data
            await Finance.update({idUsuario, tipo, valor, data}, {where : {id:idReceita}})
            res.redirect("/finances")
        }else{
            const receita = await Finance.findByPk(idReceita)
            res.render("finance_form.ejs", {title:"Editar Receita", showError:false, isUpdate:true, receita})
       }
    }

    async renderDelete(req, res){
        if(req.session.userId){
            const receita = await Finance.findByPk(req.params.id)
            if(req.session.userId == receita.userId){
                res.render("finance_delete.ejs", {title:"Deletar Receita", id:req.params.id})
            }else{
                res.render("/finances")
            }
        }else{
            res.redirect("/login")
        }
    }
    
    async postDelete(req, res){
        if(req.session.userId){
            const idReceita = req.params.id
            const receita = await Finance.findByPk(idReceita)
            if(req.session.userId == receita.userId){
                await Finance.destroy({where : {id:idReceita}})
                res.redirect("/finances")
            }else{
                res.redirect("/finances")
            }
        }else{
            res.redirect("/login")
        }
    }

    async financeFiltro(req, res){
        if(req.session.userId){
            const result = validationResult(req)
            if(result.isEmpty()){
                var tipo = req.body.tipoReceita
                var valor = req.body.valorFiltro
                var data1 = req.body.dataInicio
                var data2 = req.body.dataFim
                console.log("TIPO: ", tipo)
                console.log("VALOR: ", valor)
                if(tipo != null && valor === "nulo" && !data1){
                    await filtro1(tipo, req, res)
                }else if(tipo != null && valor !== "nulo" && !data1){
                    await filtro2(tipo, valor, req, res)
                }
                /*if(tipo != null && valor === "nulo", !data1){
                    console.log("ENTROU AQUI 1")
                   await filtro1(tipo, req, res)
                }else if(tipo != null && valor !== "nulo", !data1){
                    console.log("ENTROU AQUI 2")
                    await filtro2(tipo, valor, req, res)
                }
                    */
            }else{}
        }else{
            res.redirect("/login")
        }
    }

}

async function filtro1(tipo, req, res) {
    if(tipo === "ambos"){
        res.redirect("/finances")
    }else if(tipo === "receita"){
        const receitas = await Finance.findAll({where: {userId:req.session.userId, tipo:"receita"}, order: [['id', 'ASC']]})
        res.render("finance_list.ejs", {title:"Receitas", financas:receitas})
    }else if(tipo == "despesa"){
        const despesas = await Finance.findAll({where: {userId:req.session.userId, tipo:"despesa"}, order: [['id', 'ASC']]})
        res.render("finance_list.ejs", {title:"Receitas", financas:despesas})
    }
}

async function filtro2(tipo, valor, req, res){
    var crescimento = ""
    if(valor === "maiores"){
        crescimento = 'DEC'
    }else if(valor == "menores"){
        crescimento = 'ASC'
    }
    console.log("CRESCIMENTO: ", crescimento)
}


export default FinanceController