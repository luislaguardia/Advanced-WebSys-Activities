import express from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.post('/login', loginUser);

export default router;