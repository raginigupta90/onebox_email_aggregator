"use strict";
//console.log("Server is running...");
// import express from "express";  // Import Express
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();  // Initialize Express app
// app.listen(3000, () => {
//     console.log("🚀 Server is running on http://localhost:3000");
// });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
// Default route
app.get("/", (req, res) => {
    res.send("🚀 API is working!");
});
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
