import express from 'express';
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController.js';

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.route('/:id').put(updateArticle).delete(deleteArticle);

export default router;