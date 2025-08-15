import api from './api';

export const getWorkouts = async () => {
  const res = await api.get('/workouts');
  return res.data;
};

export const createWorkout = async (data: {
  workoutType: string;
  duration: number;
  notes?: string;
  date: string;
}) => {
  const res = await api.post('/workouts', data);
  return res.data;
};

export const updateWorkout = async (id: number, data: {
  workoutType: string;
  duration: number;
  notes?: string;
  date: string;
}) => {
  const res = await api.patch(`/workouts/${id}`, data);
  return res.data;
};

export const deleteWorkout = async (id: number) => {
  await api.delete(`/workouts/${id}`);
};
