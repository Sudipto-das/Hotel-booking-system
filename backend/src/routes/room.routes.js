const {Router } = require ("express")
const authMiddleware = require("../middleware/auth.middleware.js")
const roomController = require ("../controllers/room.controller.js");
const upload = require("../config/multer.js");
const roomRouter = Router();


roomRouter.post("/create",authMiddleware,upload.single("image"),roomController.createRoomController);
roomRouter.get("/all",authMiddleware,roomController.getAllRoomsController);
roomRouter.put("/update/:id",authMiddleware,upload.single("image"),roomController.updateRoomController);
roomRouter.delete("/delete/:id",authMiddleware,roomController.deleteRoomController);
roomRouter.get("/bookings/:id",authMiddleware,roomController.getBookingByRoomIdController);

module.exports = roomRouter;