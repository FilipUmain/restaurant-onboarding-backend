import express, { Request, Response } from "express";

const app = express();

// Get all restaurants
app.get("/restaurants", (req: Request, res: Response) =>
  res.send("Data: Hej hej")
);

// Get restaurant by id
app.get("/restaurants/:id", (req: Request, res: Response) =>
  res.send("reastaurant")
);

// Get filters
app.get("/filter", (req: Request, res: Response) => res.send("filter"));

// Get filter by id
app.get("/filter/:id", (req: Request, res: Response) => res.send("filter"));

// Get Open status by id
app.get("/open/id", (req: Request, res: Response) => res.send("open"));

// Get price-range by id
app.get("/price-range/:id", (req: Request, res: Response) =>
  res.send("price-range")
);

app.listen(3000, () => console.log("Server running on port 3000."));

module.exports = app;
