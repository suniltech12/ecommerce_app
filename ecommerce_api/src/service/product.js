
const productRepo = require("../repository/product")

const getAllProducts = async (req) => productRepo.getAllProducts(req);

const getOneProduct = async (req) => productRepo.getOneProduct(req);

const createProduct = async (req) => productRepo.createProduct(req);

const updateProductStock = async (req) => productRepo.updateProductStock(req);

const deleteProduct = async (req) => productRepo.deleteProduct(req);


module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProductStock,
    deleteProduct
};
