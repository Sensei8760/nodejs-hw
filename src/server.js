import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import logger from './middleware/logger.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());

app.use('/notes', notesRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

async function start() {
  if (!MONGO_URL) {
    console.error('❌ MONGO_URL is not defined in environment variables');
    process.exit(1);
  }

  try {
    await connectMongoDB(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
