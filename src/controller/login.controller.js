
class LoginController{

    renderLogin(req, res){
        res.render("login", {title:"Login", showError:false})
    }
}

export default LoginController