const {Router} = require("express");
const authMiddleware = require("../middleware/auth.middleware.js");
const bookingController = require("../controllers/booking.controller.js");
const bookingRouter = Router();


bookingRouter.post("/create",authMiddleware,bookingController.createBookingController)
bookingRouter.get("/all",authMiddleware,bookingController.getAllBookingsController)



module.exports = bookingRouter;