import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

app.use(cors(corsConfig));
app.use(express.json()); // poder leer datos enviados por POST o PUT
app.use(cookieParser());

//Router
app.use('/api/auth', authRoutes);

export default app;