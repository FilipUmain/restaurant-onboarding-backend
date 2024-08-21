import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => res.send("Good luck ;)"));

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/images", (req, res) => {
  res.send("");
});

// Get all restaurants
app.get("/restaurants", async (req: Request, res: Response) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.send(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get restaurant by ID
app.get("/restaurants/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
    });
    if (restaurant) {
      res.send(restaurant);
    } else {
      res.status(404).send("Restaurant not found");
    }
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all filters
app.get("/filter", async (req: Request, res: Response) => {
  try {
    const filters = await prisma.filter.findMany();
    res.send(filters);
  } catch (error) {
    console.error("Error fetching filters:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get filter by ID
app.get("/filter/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const filter = await prisma.filter.findUnique({
      where: { id },
    });
    if (filter) {
      res.send(filter);
    } else {
      res.status(404).send("Filter not found");
    }
  } catch (error) {
    console.error("Error fetching filter by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get open status
app.get("/open/:id", async (req: Request, res: Response) => {
  const resId = req.params.id;

  try {
    const status = await prisma.status.findUnique({
      where: { restaurantId: resId },
    });

    if (status) {
      res.send(status);
    } else {
      res.status(404).send({ error: "Restaurant status not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching the status" });
  }
});

// Get price-range
app.get("/price-range/:id", async (req: Request, res: Response) => {
  const priceId = req.params.id;

  try {
    const priceRange = await prisma.priceRange.findUnique({
      where: { id: priceId },
    });

    if (priceRange) {
      res.send(priceRange);
    } else {
      res.status(404).send({ error: "Price range not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching the price range" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000."));

export default app;
