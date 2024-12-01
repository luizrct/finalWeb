import { validationResult } from "express-validator"
import User from "../database/model/user.model.js"
import bcrypt, { hash } from "bcrypt"

const saltRounds = 10

class LoginController{

    renderLogin(req, res){
        if(req.session.userId){
            res.redirect("/finances")
        }else{
            res.render("login.ejs", {title:"Login", showError:false})
        }
    }

    renderRegister(req, res){
        if(req.session.userId){
            res.redirect("/finances")
        }else{
            res.render("register", {title:"Registro", showError:false})
        }
    }

    async postRegister(req, res){
        const result = validationResult(req)
        if(result.isEmpty()){
           const verificacao1 = await verificador1(req.body.email)
           if(verificacao1){
            //ainda não existe um usuário com esse email
            const name = req.body.nome 
            const email = req.body.email 
            const password = req.body.password
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if(err){
                    console.log("Ocorreu um erro na função hash: ", err)
                }else{
                    await User.create({name, email:email, password: hash})
                    res.redirect("/login")
                }
            })
           }else{
            //já existe um usuário cadastrado com esse email
            res.render("register", {title:"Registro", showError:true, tipoErro:2})
           }
        }else{
            //formulário não foi preenchido corretamente
            res.render("register", {title:"Registro", showError:true, tipoErro:1})
        }
    }

    
    postLogin(req, res){
        const result = validationResult(req)
        if(result.isEmpty()){
            const email = req.body.email
            const senha = req.body.password
            var permanencia = false
            if(req.body.remember){
                permanencia = true
            }
            verificador2(email, senha, res, req, permanencia)
        }else{
            //formulário não foi preenchido corretamente
            res.render("login.ejs", {title:"Login", showError:true, tipoErro:1})
        }
    }

    
    
}


//função que percorre banco de dados para verificar se já existe um usuário com o mesmo email
async function verificador1(email){
    try{
        const usuario = await User.findOne({ where: { email } })
        return usuario === null
    }catch(error){
        console.log(error)
    }
}

async function verificador2(email, senha, res, req, permanencia) {
    try{
        const usuario = await User.findOne({where: {email}})
        if(usuario !== null){
            bcrypt.compare(senha, usuario.password, (err, result) => {
                if(err){
                    console.log("Ocorreu um erro durante a comparção da hash")
                }else{
                    if(result){
                        req.session.userId = usuario.id
                        res.redirect("/finances")
                    }else{
                        //senha incorreta
                        res.render("login.ejs", {showError:true, tipoErro:3, title:"Login"})
                    }
                }
            })
        }else{
            //não existe um usuário cadastrado com esse email
            res.render("login.ejs", {showError: true, tipoErro:2, title:"Login"})
        }
    }catch(error){
        console.log("Ocorreu um erro durante o acesso ao banco de dados!")
    }
}

export default LoginController