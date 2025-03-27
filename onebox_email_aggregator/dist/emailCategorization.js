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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorizeEmail = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
const notificationService_1 = require("./notificationService");
dotenv_1.default.config();
console.log('API Key:', process.env.OPENAI_API_KEY);
(0, notificationService_1.sendSlackNotification)('New email categorized: Important');
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const categorizeEmail = (emailText) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const response = yield openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: `Categorize this email: ${emailText}` }],
        max_tokens: 50,
    });
    return ((_b = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.trim()) || 'No response';
});
exports.categorizeEmail = categorizeEmail;
