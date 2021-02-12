const db = require('../../../config/db');
const Product = require('../model/productModel');

module.exports = class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  static async index(req, res) {
    Product.findAll()
      .then(products => {
        res.send(products)
      })
      .catch(err => res.send(err))
  }
}