import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouters from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3030;

// Global middleware
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// Routes
app.use(authRouter);
app.use(userRouter);
app.use(notesRouters);

// 404
app.use(notFoundHandler);

// celebrate validation errors
app.use(errors());

// Final error handler (must be LAST)
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
