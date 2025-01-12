import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  getProductList,
  getCartItems,
  addToCart,
  updateCart,
  removeCartItem,
  checkoutCart,
} from "../services/apiService";
import CartModal from "../CartList/CartModal";
import Loader from "../Loader/index";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      const productsResponse = await getProductList();
      setProducts(productsResponse);

      const cartResponse = await getCartItems();
      setCart(cartResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      setIsLoading(true);
      const response = await addToCart({ productId: product.id, quantity: 1 });
      if (response) {
        const cartResponse = await getCartItems();
        setCart(cartResponse);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    try {
      const response = await updateCart({ productId, quantity });
      if (response) {
        const cartResponse = await getCartItems();
        setCart(cartResponse);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await removeCartItem(productId);
      if (response) {
        const cartResponse = await getCartItems();
        setCart(cartResponse);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await checkoutCart();
      if (response) {
        setCart([]);
        fetchInitialData();
        setIsCartOpen(false);
        alert("Checkout successful!");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
      setCartItemCount(cartCount);
    } else {
      setCartItemCount(0);
    }
  }, [cart]);

  return (
    <div className="product-list">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="top-bar">
            <Typography variant="h4" className="page-title">
              Product List
            </Typography>
            <IconButton
              color="primary"
              onClick={() => setIsCartOpen(true)}
              className="cart-icon"
            >
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
          <div className="product-list-wrapper">
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card className="product-card">
                    <CardContent>
                      <Typography variant="h5">{product.name}</Typography>
                      <Typography variant="body2">
                        {product.description}
                      </Typography>
                      <Typography variant="h6">
                        Price: ${product.price}
                      </Typography>
                      <Typography
                        color={product.stock > 0 ? "textPrimary" : "error"}
                      >
                        Stock: {product.stock}
                      </Typography>
                    </CardContent>
                    <CardActions className="add-to-cart">
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={product.stock === 0}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>

          <CartModal
            cart={cart}
            handleUpdateCartQuantity={handleUpdateCartQuantity}
            handleRemoveFromCart={handleRemoveFromCart}
            handleCheckout={handleCheckout}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;
