import express from "express";

import {
  getAllUser,
  createUser,
  signIn,
} from "../controller/user.controller.js";

const UserRoutes = express.Router();

UserRoutes.get("/users", getAllUser);
UserRoutes.post("/users", createUser);
UserRoutes.post("/connexion", signIn);

export default UserRoutes;
