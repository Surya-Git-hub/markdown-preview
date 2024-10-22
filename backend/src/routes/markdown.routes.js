"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/markdown.routes.ts
const express_1 = require("express");
const markdown_controller_1 = require("../controllers/markdown.controller");
const router = (0, express_1.Router)();
// Define the route for markdown conversion
router.post('/convert', markdown_controller_1.convert);
exports.default = router;
