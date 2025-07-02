import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/showAll', protect, getAllBooks);
router.get('/add/:id', protect, getBookById);
router.post('/create', protect, createBook);
router.put('/update/:id', protect, updateBook);
router.delete('/delete/:id', protect, deleteBook);

export default router;