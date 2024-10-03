import express from "express";
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    realtedProductController,
    searchProductController,
    updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import formidable from "express-formidable";

const productRouter = express.Router();

//routes
productRouter.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);
//routes
productRouter.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

//get products
productRouter.get("/get-product", getProductController);

//single product
productRouter.get("/get-product/:slug", getSingleProductController);

//get photo
productRouter.get("/product-photo/:pid", productPhotoController);

//delete rproduct
productRouter.delete("/delete-product/:pid", deleteProductController);

//filter product
productRouter.post("/product-filters", productFiltersController);

//product count
productRouter.get("/product-count", productCountController);

//product per page
productRouter.get("/product-list/:page", productListController);

//search Product
productRouter.get("/search/:keyword", searchProductController);

//similar product
productRouter.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
productRouter.get("/product-category/:slug", productCategoryController);
export default productRouter;