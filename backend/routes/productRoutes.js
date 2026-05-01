const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, checkRole } = require('../middleware/authMiddleware');

router.route('/')
  .get(getProducts)
  .post(protect, checkRole('Admin'), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, checkRole('Admin'), updateProduct)
  .delete(protect, checkRole('Admin'), deleteProduct);

module.exports = router;
