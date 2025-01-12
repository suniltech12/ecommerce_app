const cartItemService = require('../service/cartItem');

  const addToCart= async (req, res) => {
    try {
      const product = await cartItemService.addToCart(req);
      res.status(201).json({ message: 'Item added to cart', product });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  const  getCartItems= async (req, res) => {
    try {
      const cartItems = await cartItemService.getCartItems(req);
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

 const updateCartItemQuantity=  async (req, res) => {
    try {
      const updatedCartItem = await cartItemService.updateCartItemQuantity(req);
      res.status(200).json({ message: 'Cart item updated', updatedCartItem });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

 const  removeCartItem= async (req, res) => {
    try {
      await cartItemService.removeCartItem(req);
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

 const  checkoutCart=  async (req, res) => {
    try {
      const result = await cartItemService.checkoutCart(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  module.exports = {
    addToCart,
    getCartItems,
    updateCartItemQuantity,
    removeCartItem,
    checkoutCart
}

