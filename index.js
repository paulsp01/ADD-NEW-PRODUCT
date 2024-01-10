import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from 'path';
import middileware from './src/middileware/validation.middileware.js'
import ejsLayouts from 'express-ejs-layouts';
import validationMiddileware from "./src/middileware/validation.middileware.js"
import {uploadFile} from "./src/middileware/file-upload.middileware.js";
import UserController from './src/controllers/user.controller.js';
import {auth} from './src/middileware/auth.middileware.js';
import cookieParser from 'cookie-parser';
import {setLastVisit} from "./src/middileware/lastVisit.middileware.js";
import session from 'express-session';
import { connectUsingMongoose } from "./src/config/mongoose.js";
import mongoose from "mongoose";
const port=8001;
const server=express();
server.use(cookieParser());


const productController = new ProductController();
const userController = new UserController();
  server.set("view engine","ejs");
  server.set("views",path.join(path.resolve(),"src","views"));
  server.use(ejsLayouts);
  server.use(express.urlencoded({extended:true}));
  server.use(express.static("./public"));

server.use(express.static("src/views"))
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

server.get("/", auth, setLastVisit,productController.getProducts);
server.get('/new',auth,productController.getForm);
server.get('/register',userController.getRegister);
server.get("/sign-in", userController.getSignin);
server.post("/register",userController.postRegister);
server.post("/sign-in", userController.postLogin);
server.get("/update-product/:id", auth,productController.getUpdateProductView);
server.get("/logout",userController.logout);
server.post("/update-product",auth,productController.postUpdateProduct);
server.post("/delete-product/:id",auth, productController.postDelete);

server.post(
  "/",
  uploadFile.single("imgUrl"),
  validationMiddileware,
  productController.postForm
);
server.listen(port,(err)=>{
    if(err){
        console.log("there is an error",err)
    }
   console.log("Server is running well: "+port);
   connectUsingMongoose();
});