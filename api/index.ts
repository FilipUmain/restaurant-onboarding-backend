import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid"; // Using uuid package for generating UUIDs

const prisma = new PrismaClient();
const app = express();

const filters = [
  {
    id: "e2800cd8-763a-4716-963a-5a41b6d8d1ae",
    name: "Hamburger",
    image_url: "/images/hamburger.png",
  },
  {
    id: "657b2a62-9c3a-4c6c-81a9-8309d2b11ed9",
    name: "Pizza",
    image_url: "/images/pizza.png",
  },
  {
    id: "803582a6-92eb-42c8-be6b-f0bd1d27263f",
    name: "Taco´s",
    image_url: "/images/taco.png",
  },
  {
    id: "b06e4686-94bb-4adc-befb-c535102b909c",
    name: "Coffee",
    image_url: "/images/coffee.png",
  },
  {
    id: "82bf51fd-d37d-46f0-9635-f67d7a00bcc0",
    name: "Burrito",
    image_url: "/images/burrito.png",
  },
  {
    id: "775edaa0-84bd-4c1d-ad2b-868935f4a997",
    name: "Fries",
    image_url: "/images/fries.png",
  },
  {
    id: "f06f89eb-2a8a-4ed8-860e-f9166adacf32",
    name: "Breakfast",
    image_url: "/images/breakfast.png",
  },
];

const restaurants = [
  {
    id: "a569a2da-117d-4fc1-8036-4cf2beab62f9",
    name: "Waynes Coffee",
    rating: 4.5,
    filter_ids: ["b06e4686-94bb-4adc-befb-c535102b909c"],
    image_url: "/images/coffee.png",
    delivery_time_minutes: 30,
    price_range_id: "bc9e61c6-1a6d-4231-b623-5b8995209724",
  },
  {
    id: "714e1fca-e7af-4f82-bf60-7d210c1950f3",
    name: "Oskars Tacos",
    rating: 3.8,
    filter_ids: ["803582a6-92eb-42c8-be6b-f0bd1d27263f"],
    image_url: "/images/taco.png",
    delivery_time_minutes: 45,
    price_range_id: "b7d3879a-6256-4c02-90c0-83f608c7c02d",
  },
  {
    id: "618dd9ff-8165-4332-b3fa-e773adc254a8",
    name: "Dawids Deli",
    rating: 4.9,
    filter_ids: [
      "775edaa0-84bd-4c1d-ad2b-868935f4a997",
      "82bf51fd-d37d-46f0-9635-f67d7a00bcc0",
    ],
    image_url: "/images/fries.png",
    delivery_time_minutes: 60,
    price_range_id: "524539ed-de0f-4a4d-abff-9e6eff5f55f8",
  },
  {
    id: "43c69811-9317-4be5-991f-cfd94158af71",
    name: "Viktors Valmofrön & Potatis",
    rating: 4.2,
    filter_ids: [
      "657b2a62-9c3a-4c6c-81a9-8309d2b11ed9",
      "775edaa0-84bd-4c1d-ad2b-868935f4a997",
    ],
    image_url: "/images/pizza.png",
    delivery_time_minutes: 30,
    price_range_id: "b7d3879a-6256-4c02-90c0-83f608c7c02d",
  },
  {
    id: "23fb9771-c843-409e-be91-3a2a90716418",
    name: "Sebbes Slizes",
    rating: 4.3,
    filter_ids: ["657b2a62-9c3a-4c6c-81a9-8309d2b11ed9"],
    image_url: "/images/pizza.png",
    delivery_time_minutes: 45,
    price_range_id: "bc9e61c6-1a6d-4231-b623-5b8995209724",
  },
  {
    id: "a6e9fccc-a6a4-4a24-bc54-608706f1d90d",
    name: "Karls Korv (vegan)",
    rating: 4.4,
    filter_ids: ["f06f89eb-2a8a-4ed8-860e-f9166adacf32"],
    image_url: "/images/breakfast.png",
    delivery_time_minutes: 20,
    price_range_id: "8bca616e-47ee-47f3-b455-c972cac4b233",
  },
  {
    id: "2aa2bb01-5cdd-45ea-a24d-71ce608644b0",
    name: "Emils Elit-biffar",
    rating: 4.5,
    filter_ids: ["e2800cd8-763a-4716-963a-5a41b6d8d1ae"],
    image_url: "/images/hamburger.png",
    delivery_time_minutes: 60,
    price_range_id: "524539ed-de0f-4a4d-abff-9e6eff5f55f8",
  },
];

function generateRandomId(): string {
  return uuidv4();
}

async function randomizeRestaurantIds() {
  try {
    const restaurants = await prisma.restaurant.findMany();

    for (const restaurant of restaurants) {
      await prisma.restaurant.update({
        where: { id: restaurant.id },
        data: { id: generateRandomId() },
      });
    }

    console.log("Restaurant IDs have been updated.");
  } catch (error) {
    console.error("Error updating restaurant IDs:", error);
  }
}

setInterval(randomizeRestaurantIds, 30 * 60 * 1000);

async function seedDatabase() {
  try {
    await prisma.restaurant.createMany({
      data: restaurants,
      skipDuplicates: true,
    });

    await prisma.filter.createMany({
      data: filters,
      skipDuplicates: true,
    });

    console.log("Database has been seeded with initial data.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

// Call seedDatabase function to seed initial data
seedDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// Define routes for the Express app
app.get("/", (req: Request, res: Response) => res.send("Good luck ;)"));

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

// Define other routes as needed
app.get("/open/id", (req: Request, res: Response) => res.send("open"));
app.get("/price-range/:id", (req: Request, res: Response) =>
  res.send("price-range")
);

// Start the Express server
app.listen(3000, () => console.log("Server running on port 3000."));

export default app;
