import { validationResult } from "express-validator"
import User from "../database/model/user.model.js"
class LoginController{

    renderLogin(req, res){
        res.render("login", {title:"Login", showError:false})
    }

    renderRegister(req, res){
        res.render("register", {title:"Registro", showError:false})
    }

    postRegister(req, res){
        const result = validationResult(req)
        if(result.isEmpty()){
            res.redirect("/login")
        }else{
            res.render("register", {title:"Registro", showError:true})
        }
    }

    postLogin(req, res){
        
    }

    
    
}

//função que percorre banco de dados para verificar se já existe um usuário com o mesmo email
function verificao1(){

}
export default LoginController