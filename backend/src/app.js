const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(express.json());


const authRouter = require("./routes/auth.routes.js");
const roomRouter = require("./routes/room.routes.js")
const clientRouter = require("./routes/client.routes.js")
const bookingRouter = require("./routes/booking.routes.js")
app.use("/api/auth", authRouter);
app.use("/api/rooms", roomRouter)
app.use("/api/clients", clientRouter)
app.use("/api/bookings", bookingRouter)

module.exports = app;