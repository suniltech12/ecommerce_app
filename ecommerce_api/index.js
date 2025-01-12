const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const datasource = require("./src/datasource");
const userRoutes = require("./src/routes/user")
const productRoutes = require("./src/routes/product")
const cartItemRoutes = require("./src/routes/cartItem")

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5173/"],
    methods: ["GET,POST,PATCH,PUT,DELETE"],
  })
);

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartItemRoutes);

datasource
  .connect()
  .then(() => {
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });