import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddProductPopup = ({
  open,
  onClose,
  newProduct,
  setNewProduct,
  handleAddProduct,
}) => {
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!newProduct.name) newErrors.name = "Name is required.";
    if (!newProduct.price) newErrors.price = "Price is required.";
    if (!newProduct.stock) newErrors.stock = "Stock is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      handleAddProduct();
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add Product
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={newProduct.name}
          onChange={handleFieldChange}
          name="name"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={newProduct.description}
          onChange={handleFieldChange}
          name="description"
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={newProduct.price}
          onChange={handleFieldChange}
          name="price"
          error={!!errors.price}
          helperText={errors.price}
        />
        <TextField
          label="Stock"
          type="number"
          fullWidth
          margin="normal"
          value={newProduct.stock}
          onChange={handleFieldChange}
          name="stock"
          error={!!errors.stock}
          helperText={errors.stock}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductPopup;
