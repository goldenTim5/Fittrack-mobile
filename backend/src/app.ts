import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import workoutRoutes from './routes/workout.routes';
import adminRoutes from './routes/admin.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/workouts', workoutRoutes);

export default app;