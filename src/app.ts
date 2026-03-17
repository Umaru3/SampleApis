import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';
import mongoRoutes from './routes/mongoRoutes';

dotenv.config();
const app = express();
const port = 3000;
connectDB();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/mongo', mongoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});