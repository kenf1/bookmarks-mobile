import express, { Request, Response } from "express";
import cors from "cors";

import { users, bookmarks } from "./data/users";
import {
  LoginRequestBody,
  UserBookmarksRequestBody,
} from "./data/request_models";

const app = express();
app.use(cors());
app.use(express.json());

const PORT: number = 3000;
const APP_STATUS: string = "dev";

//bypass auth, only allowed in dev
export const viewAllData = (data: any) => {
  return (_req: Request, res: Response) => {
    if (APP_STATUS === "dev") {
      res.json(data);
    } else {
      res.send("Endpoint not available");
    }
  };
};

app.get("/users", viewAllData(users));
app.get("/bookmarks", viewAllData(bookmarks));

app.post("/users", (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    return res.json({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

app.post("/users/create", (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "Email, username, and password are required" });
  }

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const id: number = users.reduce((max, u) => Math.max(max, u.id), 100) + 1;
  users.push({ id, email, username, password });
  res.status(201).json({ id, email, username });
});

//todo: add auth
app.post(
  "/user/bookmarks",
  (req: Request<{}, {}, UserBookmarksRequestBody>, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const userBookmarks = bookmarks.filter((b) => b.userId === userId);

    res.json(userBookmarks);
  },
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
