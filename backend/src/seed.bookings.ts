// src/seed.bookings.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.model.js";
import Booking from "./models/Booking.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/vesta";

const tests = [
  { id: "cbc", name: "Complete Blood Count" },
  { id: "lipid", name: "Lipid Profile" },
  { id: "thyroid", name: "Thyroid Function Test" },
  { id: "vitaminD", name: "Vitamin D Test" },
  { id: "covid", name: "COVID-19 PCR" },
];

const locations = [
  "Hyderabad Lab Center",
  "Secunderabad Diagnostic Hub",
  "Banjara Hills Health Point",
  "Kukatpally Testing Center",
];

const randomPhone = () =>
  "9" + Math.floor(100000000 + Math.random() * 900000000).toString();

const randomDate = () => {
  const now = new Date();
  const daysToAdd = Math.floor(Math.random() * 20);
  now.setDate(now.getDate() + daysToAdd);
  return now;
};

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Booking.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️ Cleared old users & bookings");

    // Create users
    const users = [];
    for (let i = 1; i <= 5; i++) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      users.push(
        await User.create({
          name: `User ${i}`,
          phone: randomPhone(),
          email: `user${i}@example.com`,
          password: hashedPassword,
        })
      );
    }
    console.log("👤 Created users:", users.map((u) => u.email));

    // Create bookings
    const bookings = [];
    for (let i = 0; i < 10; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const test = tests[Math.floor(Math.random() * tests.length)];
      const location =
        locations[Math.floor(Math.random() * locations.length)];

      bookings.push(
        await Booking.create({
          user: user._id,
          test: test.id,
          location: location,
          date: randomDate(),
        })
      );
    }

    console.log(`📅 Created ${bookings.length} bookings`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seed();
