const express = require("express");
const Router = express.Router();

const ProductController = require("../app/controllers/ProductController");
const upload = require("../app/middlewares/uploadImage/upload");

//Add product
Router.post(
  "/add-product/store",
  upload.upload.array("imageProduct", 3),
  ProductController.addProductStore
);

//delete product
Router.delete("/delete-product/:id", ProductController.deleteProduct);

Router.get("/add-product", ProductController.addProduct);

Router.get("/", ProductController.listProducts);

module.exports = Router;
