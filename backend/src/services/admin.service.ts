import { Request, Response } from 'express';
import prisma from '../config/db';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user', details: err });
  }
};

export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await prisma.workoutLog.findMany({
      include: { user: { select: { id: true, name: true, email: true } } }
    });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts', details: err });
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.workoutLog.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete workout', details: err });
  }
};
