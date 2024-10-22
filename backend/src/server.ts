// src/server.ts
import express from 'express';
import cors from 'cors';
import markdownRoutes from './routes/markdown.routes';

const app = express();
app.use(express.json());
app.use(cors());

// Use the markdown routes
app.use('/api', markdownRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
