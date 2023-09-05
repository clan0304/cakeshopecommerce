import express from 'express';
import {
  deleteProduct,
  getProduct,
  getProducts,
} from '../controllers/product.js';

const router = express.Router();

router.delete('/:id', deleteProduct);
router.get('/:id', getProduct);
router.get('/', getProducts);
export default router;
