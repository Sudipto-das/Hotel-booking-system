const {Router } = require ("express")
const authMiddleware = require("../middleware/auth.middleware.js")
const roomController = require ("../controllers/room.controller.js");
const roomRouter = Router();


roomRouter.post("/create",authMiddleware,roomController.createRoomController);
roomRouter.get("/all",authMiddleware,roomController.getAllRoomsController);
roomRouter.put("/update/:id",authMiddleware,roomController.updateRoomController);
roomRouter.delete("/delete/:id",authMiddleware,roomController.deleteRoomController);


module.exports = roomRouter;