const {Router} =require("express");
const authMiddleware = require("../middleware/auth.middleware.js");
const clientController = require("../controllers/client.controller.js")
const clientRouter = Router();

clientRouter.post("/create",authMiddleware,clientController.createClientController);
clientRouter.patch('/assign-client',authMiddleware,clientController.assignCilentRoomController)
clientRouter.get("/all",authMiddleware,clientController.getAllClientsController);
clientRouter.put("/update/:id",authMiddleware,clientController.updateClientController);
clientRouter.delete("/delete/:id",authMiddleware,clientController.deleteClientController);

module.exports = clientRouter;