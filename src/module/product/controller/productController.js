const ProductRepository = require('../repository/productRepository');

module.exports = class ProductController {
  constructor({productService}) {
    this.productService = productService;
  }

  async index(req, res) {
    const products = await this.productService.getAll();
    return res.json(products);
  }
}