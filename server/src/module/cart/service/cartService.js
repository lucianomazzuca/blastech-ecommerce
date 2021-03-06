const Cart = require('../entity/Cart');
const CartNotDefinedError = require('../error/CartNotDefinedError');
const UserIdNotDefinedError = require('../../user/error/UserIdNotDefinedError');

class CartService {
  constructor({ cartRepository }) {
    this.cartRepository = cartRepository;
  };

  async create(userId) {
    const cart = new Cart({ user_id: userId});

    return this.cartRepository.save(cart);
  };

  async getByUserIdOrCreate(userId) {
    if (!Number(userId)) {
      throw new UserIdNotDefinedError();
    };
    
    return this.cartRepository.getByUserIdOrCreate(userId);
  };

  async findOrCreate(userId) {
    if (!Number(userId)) {
      throw new UserIdNotDefinedError();
    };
    
    let cart = await this.cartRepository.getByUserIdOrCreate(userId);

    return cart;
  }

  async addProduct(cartId, productId, quantity) {
    return this.cartRepository.addProduct(cartId, productId, quantity);
  };

  async removeProduct(cartId, productId) {
    return this.cartRepository.removeProduct(cartId, productId);
  };

  async changeQuantity(cartId, productId, quantity) {
    return this.cartRepository.changeQuantity(cartId, productId, quantity);
  };

  async merge(cart, productsToMerge) {
    let newProducts = [];

    // Check which productsToMerge aren't already saved
    productsToMerge.forEach((id) => {
      const isAlreadySaved = cart.products.some(product => product.id === id);
      if (!isAlreadySaved) {
        newProducts.push(id);
      }
    });

    if (newProducts.length > 0) {
      newProducts.forEach(async (productId) => {
        await this.cartRepository.addProduct(cart.id, productId);
      })
    }

    return;
  }
  
};

module.exports = CartService;