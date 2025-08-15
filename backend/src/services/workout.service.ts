import { Response, Request } from 'express';
import prisma from '../config/db';

export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await prisma.workoutLog.findMany({
      where: { userId: Number(req.user!.userId) }
    });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts', details: err });
  }
};

export const createWorkout = async (req: Request, res: Response) => {
  try {
    const { workoutType, duration, notes, date } = req.body;
    const workout = await prisma.workoutLog.create({
      data: {
        userId: Number(req.user!.userId),
        workoutType,
        duration,
        notes,
        date
      }
    });
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create workout', details: err });
  }
};

export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { workoutType, duration, notes, date } = req.body;

    const updated = await prisma.workoutLog.updateMany({
      where: { id: Number(id), userId: Number(req.user!.userId) },
      data: { workoutType, duration, notes, date }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update workout', details: err });
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.workoutLog.deleteMany({
      where: { id: Number(id), userId: Number(req.user!.userId) }
    });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete workout', details: err });
  }
};
