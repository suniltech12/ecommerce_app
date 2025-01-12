const productService = require('../service/product');

 const getAllProducts=  async (req, res) => {
    try {
      const products = await productService.getAllProducts(req);
      res.status(200).json({data:products});
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  const getOneProduct=  async (req, res) => {
    try {
      const products = await productService.getOneProduct(req);
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  const  createProduct = async (req, res) => {
    try {
      const newProduct = await productService.createProduct(req);
      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

 
 const  updateProductStock=  async (req, res) => {
    try {
      const updatedProduct = await productService.updateProductStock(req);
      res.status(200).json({ message: 'Product stock updated', product: updatedProduct });
    } catch (error) {
      console.error('Error updating product stock:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  const  deleteProduct=  async (req, res) => {
    try {
      await productService.deleteProduct(req);
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error updating product stock:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
module.exports = {
    getAllProducts,
    createProduct,
    updateProductStock,
    getOneProduct,
    deleteProduct
}