import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server running on port 3000."));

module.exports = app;
