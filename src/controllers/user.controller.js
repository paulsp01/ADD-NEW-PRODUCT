import path from 'path';
import UserModel from '../models/user.model.js';
import ProductModel from '../models/product.model.js';
export default class UserController {
  getRegister(req, res) {
    return res.render("user");
  }
  getSignin(req, res) {
    return res.render("user-signIn", { errorMessage: null });
  }
 
  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.render("user-signIn", { errorMessage: null });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    if (!user) {
      return res.render("user-signIn", {
        errorMessage: "Invalid Credentials",
      });
    }
    req.session.userEmail=email;
    var product = ProductModel.get();
    res.render("product", {
      products: product,
      userEmail: req.session.userEmail,
    });
  }
     logout(req, res){
    // on logout, destroy the session
    req.session.destroy((err)=>{
      if(err){
        console.log(err);
      }
      else{
        res.redirect('/sign-in');
      }
    });
    res.clearCookie('lastVisit');

  }
}