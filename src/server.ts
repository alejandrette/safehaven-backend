import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

dotenv.config()
connectDB();

const app = express()
app.use(cors(corsConfig))
app.use(express.json()) // poder leer datos enviados por POST o PUT

//Router
app.use('/api/auth', authRoutes)

export default app