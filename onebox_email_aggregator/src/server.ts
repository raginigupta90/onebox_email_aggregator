import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateReply } from "./aiReplyService";

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express app
app.use(express.json()); // Middleware for JSON parsing
app.use(cors()); // Enable CORS

// ✅ Add a test route
app.get("/api/test", (req: Request, res: Response) => {
  res.send("API is working!");
});

app.post("/generate-reply", async (req: Request, res: Response): Promise<void> => {
  const { emailText } = req.body;

  if (!emailText) {
    res.status(400).json({ error: "Missing email text." });
    return;
  }

  try {
    const reply = await generateReply(emailText);
    res.json({ reply });
  } catch (error) {
    console.error("Error generating AI reply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
