import axios from "axios";

const URL = "http://localhost:8080";
export const loginUser = async (payload) => {
  try {
    const responce = await axios.post(`${URL}/api/users/login`, payload);
    if (responce.data) {
      alert(responce.data.data.message);
      return responce.data.data;
    }
  } catch (error) {
    console.log("errr", error);
  }
};

export const registerUser = async (payload) => {
  try {
    const responce = await axios.post(`${URL}/api/users/register`, payload);
    if (responce.data) {
      alert(responce.data.message);
      return responce.data.data;
    }
  } catch (error) {
    console.log("errr", error);
  }
};

export const getProductList = async () => {
  try {
    const response = await axios.get(`${URL}/api/product/get/all`, {
      headers: {
        Authorization: `Bearer ${localStorage
          .getItem("token")
          ?.replace(/['"]+/g, "")}`,
      },
    });
    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    console.log("errr", error);
  }
};
export const addProduct = async (payload) => {
  try {
    const response = await axios.post(`${URL}/api/product/create`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage
          .getItem("token")
          ?.replace(/['"]+/g, "")}`,
      },
    });
    if (response.data) {
      alert(response.data.message);
      return response.data.product;
    }
  } catch (error) {
    console.log("errr", error);
  }
};

export const updateProduct = async (payload, id) => {
  try {
    const response = await axios.patch(
      `${URL}/api/product/update/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("token")
            ?.replace(/['"]+/g, "")}`,
        },
      }
    );
    if (response.data) {
      alert(response.data.message);
      return response.data;
    }
  } catch (error) {
    console.log("errr", error);
  }
};
export const addToCart = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/cart/add`, data, {
      headers: {
        Authorization: `Bearer ${localStorage
          .getItem("token")
          ?.replace(/['"]+/g, "")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
// Fetch cart items
export const getCartItems = async () => {
  try {
    const response = await axios.get(`${URL}/api/cart/get`, {
      headers: {
        Authorization: `Bearer ${localStorage
          .getItem("token")
          ?.replace(/['"]+/g, "")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

// Update cart item quantity
export const updateCart = async (data) => {
  try {
    const response = await axios.put(`${URL}/api/cart/update`, data, {
      headers: {
        Authorization: `Bearer ${localStorage
          .getItem("token")
          ?.replace(/['"]+/g, "")}`,
      },
    });
    debugger;
    return response.data.updatedCartItem;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};

// Remove item from cart
export const removeCartItem = async (productId) => {
  try {
    const response = await axios.delete(`${URL}/api/cart/remove`, {
      headers: {
        Authorization: `Bearer ${localStorage
          .getItem("token")
          ?.replace(/['"]+/g, "")}`,
      },
      data: { productId },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};

// Checkout cart
export const checkoutCart = async () => {
  try {
    const response = await axios.post(
      `${URL}/api/cart/checkout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("token")
            ?.replace(/['"]+/g, "")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};
