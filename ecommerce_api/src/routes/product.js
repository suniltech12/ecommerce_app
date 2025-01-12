const express = require('express');
const productController = require('../controllers/product');
const auth = require('../utils/middleware/auth');
const routes = require('../utils/routes/routes.util');
const adminAuth = require('../utils/middleware/AdminAuth');

const router = express.Router();

//  ------------------------------------- GET ---------------------------------------------------------------

router.get(routes.getAllProduct,auth, productController.getAllProducts);

router.get(routes.getProductOne,auth, productController.getOneProduct);

//  ------------------------------------- POST ---------------------------------------------------------------

router.post(routes.createProduct, adminAuth, productController.createProduct);

//  ------------------------------------- PATCH ---------------------------------------------------------------

router.patch(routes.updateProduct, adminAuth, productController.updateProductStock);

//  ------------------------------------- DELETE ---------------------------------------------------------------

router.delete(routes.deleteProduct, adminAuth, productController.deleteProduct);

module.exports = router;
