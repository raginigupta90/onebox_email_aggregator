"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//console.log("Server is running...");
const express_1 = __importDefault(require("express")); // Import Express
const app = (0, express_1.default)(); // Initialize Express app
app.listen(3000, () => {
    console.log("🚀 Server is running on http://localhost:3000");
});
