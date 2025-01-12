const { Product } = require("../model/product");

const getAllProducts = async () => {
  return await Product.findAll({});
};

const getOneProduct = async (req) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("User ID is required.");
    }

    const product = await Product.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("product not found.");
    }

    return {
      status: 200,
      data: product,
    };
  } catch (error) {
    return {
      status: 404,
      error: error.message,
    };
  }
};

const createProduct = async (req) => {
  try {
    const { name, description, price, stock } = req.body;
    const { id } = req.user;

    if (!name || price === undefined || stock === undefined) {
      throw new Error(
        "All fields (name, description, price, stock) are required."
      );
    }

    if (!price && price <= 0) {
      throw new Error("Price must be a positive number.");
    }

    if (!stock && stock < 0) {
      throw new Error("Stock must be a non-negative number.");
    }

    return await Product.create({
      name,
      description,
      price,
      stock,
      userId: id,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw error;
  }
};

const updateProductStock = async (req) => {
  try {
    const { id } = req.params;
    const { usedStock } = req.body;
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
   
    await Product.update(
      { stock : usedStock },
      {
        where: {
          id,
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    return Product.destroy({ where: { id } });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProductStock,
  deleteProduct
};
