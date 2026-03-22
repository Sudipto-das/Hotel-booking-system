const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser")

app.use(cookieParser())

// Handle CORS properly for production (Vercel)
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
        exposedHeaders: ['Set-Cookie']
    }
));

// Handle preflight requests explicitly
app.options("*", cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


const authRouter = require("./routes/auth.routes.js");
const roomRouter = require("./routes/room.routes.js")
const clientRouter = require("./routes/client.routes.js")
const bookingRouter = require("./routes/booking.routes.js")
app.use("/api/auth", authRouter);
app.use("/api/rooms", roomRouter)
app.use("/api/clients", clientRouter)
app.use("/api/bookings", bookingRouter)

module.exports = app;