import express, { Request, Response } from "express";
import { Restaurant } from "../types/Restaurant";

const app = express();
const restaurants: Restaurant[] = [
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
];

function getRandomString(length = 20) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function randomizeRestaurantIds() {
  restaurants.forEach((restaurant) => {
    restaurant.id = getRandomString();
  });
  console.log("Restaurant IDs have been randomized:", restaurants);
}

randomizeRestaurantIds();

setInterval(randomizeRestaurantIds, 1800000);

app.get("/", (req: Request, res: Response) => res.send("Good luck ;)"));

// Get all restaurants
app.get("/restaurants", (req: Request, res: Response) => res.send(restaurants));

// Get restaurant by id
app.get("/restaurants/:id", (req: Request, res: Response) => {
  const id = JSON.parse(req.params.id);

  const item = restaurants.find((item: Restaurant) => item.id === id);

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
