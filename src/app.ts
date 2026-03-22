import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';
import mongoRoutes from './routes/mongoRoutes';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(cors(
    {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'], 
    }
));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/mongo', mongoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});