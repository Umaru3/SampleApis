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

const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL    
];

app.use(cors({

  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/mongo', mongoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});