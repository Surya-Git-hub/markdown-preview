// src/routes/markdown.routes.ts
import { Router } from 'express';
import { convert } from '../controllers/markdown.controller';

const router = Router();

// Define the route for markdown conversion
router.post('/convert', convert);

export default router;
