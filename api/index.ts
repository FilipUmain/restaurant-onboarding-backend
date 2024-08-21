import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const prisma = new PrismaClient();
const app = express();

const seedPriceRanges = async () => {
  const priceRangeCount = await prisma.priceRange.count();
  if (priceRangeCount === 0) {
    await prisma.priceRange.createMany({
      data: [
        { range: "$" },
        { range: "$$" },
        { range: "$$$" },
        { range: "$$$$" },
      ],
    });
    console.log("PriceRanges seeded");
  } else {
    console.log("PriceRanges already seeded");
  }
};

const seedFilters = async () => {
  const filterCount = await prisma.filter.count();
  if (filterCount === 0) {
    await prisma.filter.createMany({
      data: [
        { name: "Vegan", image_url: "vegan.jpg" },
        { name: "Family Friendly", image_url: "family_friendly.jpg" },
        { name: "Fast Food", image_url: "fast_food.jpg" },
        { name: "Fine Dining", image_url: "fine_dining.jpg" },
      ],
    });
    console.log("Filters seeded");
  } else {
    console.log("Filters already seeded");
  }
};

const seedRestaurants = async () => {
  const restaurantCount = await prisma.restaurant.count();
  if (restaurantCount === 0) {
    const priceRanges = await prisma.priceRange.findMany();

    await prisma.restaurant.createMany({
      data: [
        {
          name: "Vegan Bistro",
          rating: 5,
          image_url: "vegan_bistro.jpg",
          delivery_time_minutes: 30,
          priceRangeId: priceRanges[0].id, // Assuming 0 index corresponds to "$"
        },
        {
          name: "Family Delight",
          rating: 4,
          image_url: "family_delight.jpg",
          delivery_time_minutes: 45,
          priceRangeId: priceRanges[1].id, // Assuming 1 index corresponds to "$$"
        },
        // Add more restaurants here
      ],
    });

    console.log("Restaurants seeded");
  } else {
    console.log("Restaurants already seeded");
  }
};

const seedStatuses = async () => {
  const restaurantCount = await prisma.restaurant.count();
  const statusCount = await prisma.status.count();

  // Create a status for each restaurant only if statuses are not already seeded
  if (restaurantCount > 0 && statusCount === 0) {
    const restaurants = await prisma.restaurant.findMany();

    for (const restaurant of restaurants) {
      await prisma.status.create({
        data: {
          is_currently_open: Math.random() < 0.5, // Randomly determine if the restaurant is open
          restaurantId: restaurant.id,
        },
      });
    }

    console.log("Statuses seeded");
  } else if (statusCount > 0) {
    console.log("Statuses already seeded");
  } else {
    console.log("No restaurants to seed statuses for");
  }
};

const seedRestaurantFilters = async () => {
  const restaurantCount = await prisma.restaurant.count();
  const filterCount = await prisma.filter.count();

  if (restaurantCount > 0 && filterCount > 0) {
    const restaurantFilters: any = [];

    const restaurants = await prisma.restaurant.findMany();
    const filters = await prisma.filter.findMany();

    // Assign each restaurant 2 random filters
    restaurants.forEach((restaurant) => {
      const assignedFilters = new Set();
      while (assignedFilters.size < 2) {
        const randomFilter =
          filters[Math.floor(Math.random() * filters.length)];
        assignedFilters.add(randomFilter.id);
      }

      assignedFilters.forEach((filterId) => {
        restaurantFilters.push({
          restaurantId: restaurant.id,
          filterId,
        });
      });
    });

    await prisma.restaurantFilter.createMany({
      data: restaurantFilters,
    });

    console.log("RestaurantFilters seeded");
  } else {
    console.log("No restaurants or filters to seed RestaurantFilters");
  }
};

const main = async () => {
  await seedPriceRanges();
  await seedFilters();
  await seedRestaurants();
  await seedStatuses();
  await seedRestaurantFilters();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.get("/", (req: Request, res: Response) => res.send("Good luck ;)"));

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/images", (req, res) => {
  res.send("Images are served at /images/[image-name].");
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
