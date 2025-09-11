import express, { Request, Response } from "express";
import cors from "cors";

import { users } from "./data/users";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome!");
});

app.get("/users", (_req: Request, res: Response) => {
  res.json(users);
});

app.post("/users", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    return res.json({ id: user.id, email: user.email });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
