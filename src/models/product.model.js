export default class ProductModel {
  constructor(id, name, desc, price, imgUrl) {
    (this.id = id),
      (this.name = name),
      (this.desc = desc),
      (this.price = price),
      (this.imgUrl = imgUrl);
  }
  static get() {
    return products;
  }

  static update(pro) {
    const index = products.findIndex((p) => p.id ==pro. id);
    products[index] = pro;
  }
  static delete(id){
     const index = products.findIndex((product) => product.id == id);
     if (index !== -1) {
       // If the product with the given ID exists, remove it from the array
       products.splice(index, 1);
       return { success: true, message: `Product with ID ${id} deleted successfully.` };
     } else {
       // If the product with the given ID does not exist

       return { success: false, message: `Product with ID ${id} not found.` };;
     }
  }

  static add(name,desc,price,imgUrl) {
    let newProduct = new ProductModel(
      products.length + 1,
      name,
      desc,
      price,
      imgUrl
    );
    products.push(newProduct);
  }
  static getById(id) {
    return products.find((p) => p.id == id);
  }
}

    var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    ),]
