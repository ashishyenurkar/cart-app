import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controller/productController.js';
import { protectAdminRoute } from '../middelware/protectRoute.js';

const router = express.Router();

// Create a new product
router.route('/product/create').post(protectAdminRoute, createProduct);

// Get all products
router.route('/products').get(getProducts);

// Get a single product by ID
router.route('/product/:id').get(getProductById);

// Update a product
router.route('/product/update/:id').put(protectAdminRoute, updateProduct);

// Delete a product
router.route('/product/delete/:id').delete(protectAdminRoute, deleteProduct);

export default router;
