import express from 'express';
import { config } from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

config();
const app = express();
app.use(express.json());
app.use(logger);

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// 404 Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));