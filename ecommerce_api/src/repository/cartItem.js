const { Product } = require("../model/product");
const { CartItem } = require("../model/cartItem");

const addToCart = async (req) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  const product = await Product.findByPk(productId);
  if (!product || product.stock < quantity) {
    throw new Error("Product not available or insufficient stock");
  }

  const existingCartItem = await CartItem.findOne({
    where: { userId, productId },
  });

  if (existingCartItem) {
    existingCartItem.quantity += quantity;
    if (existingCartItem.quantity > product.stock) {
      throw new Error("Cannot add more items than available in stock");
    }
    await existingCartItem.save();
  } else {
    await CartItem.create({
      userId,
      productId,
      quantity,
    });
  }

  return product;
};

const getCartItems = async (req) => {
  const { id } = req.user;
  return await CartItem.findAll({
    where: { userId: id },
    include: {
      model: Product,
      attributes: ["id", "name", "price", "stock"],
    },
  });
};

const updateCartItemQuantity = async (req) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  const product = await Product.findByPk(productId);
  if (!product || product.stock < quantity) {
    throw new Error("Product not available or insufficient stock");
  }

  const cartItem = await CartItem.findOne({
    where: { userId, productId },
  });

  if (!cartItem) {
    throw new Error("Item not found in cart");
  }

  cartItem.quantity = quantity;
  await cartItem.save();

  return cartItem;
};

const removeCartItem = async (req) => {
    const { productId } = req.body;
  const userId = req.user.id;
  const cartItem = await CartItem.findOne({
    where: { userId, productId },
  });

  if (!cartItem) {
    throw new Error("Item not found in cart");
  }

  await cartItem.destroy();
};


const checkoutCart = async (req) => {
    const userId = req.user.id;
  const cartItems = await CartItem.findAll({
    where: { userId },
    include: { model: Product, attributes: ["id", "stock", "price"] },
  });

  if (!cartItems.length) {
    throw new Error("Cart is empty");
  }

  for (const item of cartItems) {
    if (item.quantity > item.Product.stock) {
      throw new Error(`Insufficient stock for product: ${item.Product.name}`);
    }
    item.Product.stock -= item.quantity;
    await item.Product.save();

    await item.destroy();
  }

  return { message: "Checkout successful", cartItems };
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  checkoutCart,
};
