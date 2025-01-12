const cartItemRepo = require("../repository/cartItem")

const addToCart = async (req) => cartItemRepo.addToCart(req);

const getCartItems = async (req) => cartItemRepo.getCartItems(req);

const updateCartItemQuantity = async (req) => cartItemRepo.updateCartItemQuantity(req);

const removeCartItem = async (req) => cartItemRepo.removeCartItem(req);

const checkoutCart = async (req) => cartItemRepo.checkoutCart(req);

module.exports = {
    addToCart,
    getCartItems,
    updateCartItemQuantity,
    removeCartItem,
    checkoutCart
}