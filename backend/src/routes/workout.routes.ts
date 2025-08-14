import { Router } from 'express';
import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout
} from '../services/workout.service';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.get('/', protect, getWorkouts);
router.post('/', protect, createWorkout);
router.patch('/:id', protect, updateWorkout);
router.delete('/:id', protect, deleteWorkout);

export default router;
