"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const markdown_service_1 = require("../services/markdown.service");
const convert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const markdownText = req.body.text;
    const htmlContent = yield (0, markdown_service_1.convertMarkdownToHtml)(markdownText);
    res.json({ html: htmlContent });
});
exports.convert = convert;
