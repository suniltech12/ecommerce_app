import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { Close as CloseIcon, Check as CheckIcon } from "@mui/icons-material";
import "./Home.css";
import AddProductPopup from "./AddProductPopup";
import {
  addProduct,
  getProductList,
  updateProduct,
} from "../services/apiService";
import Loader from "../Loader";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingStockValue, setEditingStockValue] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await getProductList();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserRole = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.role) {
        setUserRole(user.role);
      } else {
        setUserRole(null);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  useEffect(() => {
    if (userRole) {
      fetchProducts();
    }
  }, [userRole]);

  useEffect(() => {
    fetchUserRole();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewProduct({ name: "", description: "", price: "", stock: "" });
  };

  const handleAddProduct = async () => {
    const { name, price, stock } = newProduct;

    // Validation
    if (!name || !price || !stock) {
      alert("Name, Price, and Stock are required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await addProduct(newProduct);
      if (result) {
        fetchProducts();
        handleClose();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStock = (id, stock) => {
    setEditingProductId(id);
    setEditingStockValue(stock);
  };

  const handleUpdateStock = async (id) => {
    setIsLoading(true);
    try {
      const payload = {
        usedStock: editingStockValue,
      };
      const result = await updateProduct(payload, id);
      if (result) {
        fetchProducts();
        setEditingProductId(null);
        setEditingStockValue("");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditingStockValue("");
  };

  if (userRole && userRole !== "Admin") {
    return <Navigate to="/user-dashboard" />;
  }
  return (
    <Box className="home-container">
      {isLoading && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", color: "white" }}
          >
            Admin Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ marginBottom: 2 }}
          >
            Add New Product
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      {editingProductId === product.id ? (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <TextField
                            value={editingStockValue}
                            onChange={(e) =>
                              setEditingStockValue(e.target.value)
                            }
                            type="number"
                            size="small"
                          />
                          <IconButton
                            color="success"
                            onClick={() => handleUpdateStock(product.id)}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton color="error" onClick={handleCancelEdit}>
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        <Typography
                          onDoubleClick={() =>
                            handleEditStock(product.id, product.stock)
                          }
                          sx={{ cursor: "pointer" }}
                        >
                          {product.stock}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Add Product Dialog */}
      <AddProductPopup
        open={open}
        onClose={handleClose}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleAddProduct={handleAddProduct}
      />
    </Box>
  );
};

export default Home;
