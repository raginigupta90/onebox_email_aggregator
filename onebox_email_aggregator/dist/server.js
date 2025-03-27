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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const aiReplyService_1 = require("./aiReplyService");
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)(); // Initialize Express app
app.use(express_1.default.json()); // Middleware for JSON parsing
app.use((0, cors_1.default)()); // Enable CORS
// ✅ Fix: Explicitly define the function as an Express request handler
app.post("/generate-reply", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailText } = req.body;
    if (!emailText) {
        res.status(400).json({ error: "Missing email text." });
        return;
    }
    try {
        const reply = yield (0, aiReplyService_1.generateReply)(emailText);
        res.json({ reply });
    }
    catch (error) {
        console.error("Error generating AI reply:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// ✅ Fix: Ensure PORT is properly assigned
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
