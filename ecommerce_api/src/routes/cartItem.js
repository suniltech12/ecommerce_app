const express = require('express');
const cartItemController = require('../controllers/cartItem');
const auth = require('../utils/middleware/auth');
const routes = require('../utils/routes/routes.util');
const router = express.Router();


//  ------------------------------------- POST ---------------------------------------------------------------


router.post(routes.addCartItem, auth, cartItemController.addToCart);

router.post(routes.chekout, auth, cartItemController.checkoutCart);


//  ------------------------------------- GET ---------------------------------------------------------------

router.get(routes.getCartItem, auth, cartItemController.getCartItems);

//  ------------------------------------- PATCH ---------------------------------------------------------------

router.put(routes.updateCart, auth, cartItemController.updateCartItemQuantity);

//  ------------------------------------- DELETE ---------------------------------------------------------------

router.delete(routes.removeCart, auth, cartItemController.removeCartItem);



module.exports = router;
