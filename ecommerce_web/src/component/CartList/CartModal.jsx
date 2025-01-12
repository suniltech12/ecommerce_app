import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./CartModel.css";

const CartModal = ({
  cart,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
  handleCheckout,
  isCartOpen,
  setIsCartOpen,
}) => {
  return (
    <Modal
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      aria-labelledby="cart-modal-title"
      aria-describedby="cart-modal-description"
    >
      <Box className="cart-modal">
        <div className="cart-modal-header">
          <Typography variant="h5" id="cart-modal-title">
            Your Cart
          </Typography>
          <IconButton
            className="close-button"
            onClick={() => setIsCartOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="cart-items-list">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.productId} className="cart-item">
                <Typography variant="h6">{item.Product.name}</Typography>
                <Typography>Price: ${item.Product.price}</Typography>
                <div className="cart-item-actions">
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleUpdateCartQuantity(
                        item.productId,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleUpdateCartQuantity(
                        item.productId,
                        item.quantity + 1
                      )
                    }
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item.productId)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <Typography>Your cart is empty.</Typography>
          )}
        </div>
        <div className="cart-total">
          <Typography variant="h6">
            Total: $
            {cart.reduce(
              (total, item) => total + item.Product.price * item.quantity,
              0
            )}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            className="checkout-button"
          >
            Checkout
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CartModal;
