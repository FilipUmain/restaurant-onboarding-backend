import express, { Request, Response } from "express";
import { Restaurant } from "../types/Restaurant";
import { Filter } from "../types/Filter";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

export const filters: Filter[] = [
  {
    id: "1a2b3c4d5e6f7g8h9i0j",
    name: "Vegan",
    image_url: "https://example.com/images/vegan.jpg",
  },
  {
    id: "2b3c4d5e6f7g8h9i0j1a",
    name: "Gluten-Free",
    image_url: "https://example.com/images/gluten-free.jpg",
  },
  {
    id: "3c4d5e6f7g8h9i0j1a2b",
    name: "Organic",
    image_url: "https://example.com/images/organic.jpg",
  },
  {
    id: "4d5e6f7g8h9i0j1a2b3c",
    name: "Low Carb",
    image_url: "https://example.com/images/low-carb.jpg",
  },
  {
    id: "5e6f7g8h9i0j1a2b3c4d",
    name: "Halal",
    image_url: "https://example.com/images/halal.jpg",
  },
];

async function main() {
  await prisma.restaurant.createMany({
    data: [
      {
        id: "1",
        name: "Gourmet Burger Bistro",
        rating: 4.7,
        filter_ids: ["1"],
        image_url: "https://example.com/images/gourmet-burger-bistro.jpg",
        delivery_time_minutes: 35,
        price_range_id: "2",
      },
      {
        id: "2",
        name: "Pasta Palace",
        rating: 4.5,
        filter_ids: ["2"],
        image_url: "https://example.com/images/pasta-palace.jpg",
        delivery_time_minutes: 30,
        price_range_id: "3",
      },
      {
        id: "3",
        name: "Sushi Central",
        rating: 4.9,
        filter_ids: ["3"],
        image_url: "https://example.com/images/sushi-central.jpg",
        delivery_time_minutes: 45,
        price_range_id: "4",
      },
      {
        id: "4",
        name: "Veggie Delight",
        rating: 4.3,
        filter_ids: ["1"],
        image_url: "https://example.com/images/veggie-delight.jpg",
        delivery_time_minutes: 25,
        price_range_id: "1",
      },
      {
        id: "5",
        name: "Steakhouse Supreme",
        rating: 4.8,
        filter_ids: ["5"],
        image_url: "https://example.com/images/steakhouse-supreme.jpg",
        delivery_time_minutes: 50,
        price_range_id: "5",
      },
    ],
    skipDuplicates: true,
  });
  const restaurants = await prisma.restaurant.findMany();
  console.log(restaurants);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// randomizeRestaurantIds();

// setInterval(randomizeRestaurantIds, 1800000);

app.get("/", (req: Request, res: Response) => res.send("Good luck ;)"));

// Get all restaurants
app.get("/restaurants", async (req: Request, res: Response) => {
  const restaurants = await prisma.restaurant.findMany();
  res.send(restaurants);
});

// Get restaurant by id
app.get("/restaurants/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const restaurants = await prisma.restaurant.findMany();

  const item = restaurants.find((item: any) => item.id === id);

  res.send(item);
});

// Get filters
app.get("/filter", (req: Request, res: Response) => res.send("filter"));

// Get filter by id
app.get("/filter/:id", (req: Request, res: Response) => res.send("filter"));

// Get open status by id
app.get("/open/id", (req: Request, res: Response) => res.send("open"));

// Get price-range by id
app.get("/price-range/:id", (req: Request, res: Response) =>
  res.send("price-range")
);

app.listen(3000, () => console.log("Server running on port 3000."));

module.exports = app;
