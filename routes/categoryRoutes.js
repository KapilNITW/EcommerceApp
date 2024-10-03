
import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";
import {
    categoryControlller,
    createCategoryController,
    deleteCategoryCOntroller,
    singleCategoryController,
    updateCategoryController,
} from "./../controllers/categoryController.js";

const categoryRoutes = express.Router();

//routes
// create category
categoryRoutes.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);

//update category
categoryRoutes.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
);

//getALl category
categoryRoutes.get("/get-category", categoryControlller);

//single category
categoryRoutes.get("/single-category/:slug", singleCategoryController);

//delete category
categoryRoutes.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryCOntroller
);

export default categoryRoutes;
