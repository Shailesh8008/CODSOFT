import express from "express";
import { auth } from "../middleware/auth";
import { adminAuth } from "../middleware/auth";
const apiRouter = express.Router();
import adminController from "../controllers/admin";
import userController from "../controllers/user";

apiRouter.get("/health", (req, res) => res.json({ response: "ok" }));

apiRouter.get("/api/auth/user", auth, userController.checkUser);
apiRouter.get("/api/checkadmin", auth, adminAuth, adminController.checkAdmin);

export default apiRouter;
