import { Router } from 'express';
import { adminOnly, protect } from '../middleware/auth.middleware';
import {
  getAllUsers,
  deleteUser,
  getAllWorkouts,
  deleteWorkout
} from '../services/admin.service';

const router = Router();

router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/users/:id', protect, adminOnly, deleteUser);

router.get('/workouts', protect, adminOnly, getAllWorkouts);
router.delete('/workouts/:id', protect, adminOnly, deleteWorkout);

export default router;
