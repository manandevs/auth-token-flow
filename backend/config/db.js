const mongoose = require("mongoose");

async function connectDB() {
  // Mongoose v7+ defaults are good; no extra options needed.
  await mongoose.connect(process.env.MONGODB_URI, {
    // 1s is often too low for Atlas (DNS, TLS, Wi‑Fi). Default driver value is 30000ms.
    serverSelectionTimeoutMS: 30_000,
  });
  return mongoose.connection;
}

module.exports = connectDB;
