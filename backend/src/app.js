const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: process.env.CLIENT_URL, 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("/{*any}", cors(corsOptions)); // ← handles preflight for ALL routes

app.use(cookieParser());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const authRouter = require("./routes/auth.routes.js");
const roomRouter = require("./routes/room.routes.js");
const clientRouter = require("./routes/client.routes.js");
const bookingRouter = require("./routes/booking.routes.js");

app.use("/api/auth", authRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/clients", clientRouter);
app.use("/api/bookings", bookingRouter);

module.exports = app;
