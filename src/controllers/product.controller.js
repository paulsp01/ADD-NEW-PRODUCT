import path from "path";
import ProductModel from '../models/product.model.js';

export default class ProductController {
  getProducts(req, res) {
    let product = ProductModel.get();

    return res.render("product", {
      products: product,
      userEmail: req.session.userEmail,
    });

    // return res.sendFile(path.join(path.resolve(),"src",'views',"product.html" ));
  }
  getForm(req, res) {
    return res.render("new-product", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }
  postForm(req, res) {
    const {name,desc,price}=req.body;
    const imgUrl="images/"+req.file.filename;
    ProductModel.add(name,desc,price,imgUrl);
    let product = ProductModel.get();

    return res.render("product", {
      products: product,
      userEmail: req.session.userEmail,
    });
  }
  getUpdateProductView(req, res, next) {
    // 1. if product exists then return view
    const id  = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    }
    // 2. else return errors.
    else {
      res.status(401).send("Product not found");
    }
  }
  postUpdateProduct(req,res){
    ProductModel.update(req.body);
    let product = ProductModel.get();

    return res.render("product", { products: product });

  }
  postDelete(req,res){
    const id=req.params.id;
    ProductModel.delete(id);
    let product = ProductModel.get();
     return res.render("product", { products: product });
}
  }

  

