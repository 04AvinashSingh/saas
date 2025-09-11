import express from "express";
import {
  getUserCreations,
  getPublishedCreations,
  toggleLikesCreations
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/creations", getUserCreations);
userRouter.get("/published-creations", getPublishedCreations);
userRouter.post("/toggle-like", toggleLikesCreations);

export default userRouter;
