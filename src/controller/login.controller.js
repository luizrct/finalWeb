import { validationResult } from "express-validator"
import User from "../database/model/user.model.js"
class LoginController{

    renderLogin(req, res){
        res.render("login", {title:"Login", showError:false})
    }

    renderRegister(req, res){
        res.render("register", {title:"Registro", showError:false})
    }

    async postRegister(req, res){
        const result = validationResult(req)
        if(result.isEmpty()){
            //verifica se existe um usuário com o mesmo email
            if(verificador1(req.body.email)){
               res.redirect("/login")
            }else{
                res.render("register", {title:"Registro", showError:true, tipoErro:2})
            }
        }else{
            console.log("O formulário não foi preenchido corretamente")
            res.render("register", {title:"Registro", showError:true, tipoErro:1})
        }
    }

    postLogin(req, res){
        
    }

    
    
}


//função que percorre banco de dados para verificar se já existe um usuário com o mesmo email
async function verificador1(email){
    try{
        const usuario = await User.findOne({ where: { email } })
        return usuario != null
    }catch(error){
        console.log(error)
    }
}

export default LoginController