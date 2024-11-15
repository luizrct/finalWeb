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
            if(verificador1(req.body.email)){
                const name = req.body.nome
                const email = req.body.email
                const password = req.body.password
                await User.create({name, email, password})
                res.redirect("/login")
            }else{
                 res.render("register", {title:"Registro", showError:true, tipoErro:2})
            }
        }else{
            res.render("register", {title:"Registro", showError:true, tipoErro:1})
        }
    }

    postLogin(req, res){
        
    }

    
    
}


//função que percorre banco de dados para verificar se já existe um usuário com o mesmo email
async function verificador1(email){
    try{
        const usuario = User.findOne({ where: {email}})
        if(usuario){
            return true
        }else{
            return false
        }
    }catch (error){
        console.log(error)
        return false
    }
}

export default LoginController