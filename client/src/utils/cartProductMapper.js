function fromApi(product) {
  const productMapped = {
    id: product.id,
    model: product.model,
    category: product.category,
    brand: product.brands,
    price: product.price,
    image: product.image,
    quantity: product.CartProduct.quantity,
    discount: product.discount
  };

  return productMapped;
}

module.exports = {fromApi}