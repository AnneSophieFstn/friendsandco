import express from "express";

import {
  getUserNotFriend,
  createUser,
  signIn,
} from "../controller/user.controller.js";

const UserRoutes = express.Router();

UserRoutes.get("/users-no-friend/:id", getUserNotFriend);
UserRoutes.post("/inscription", createUser);
UserRoutes.post("/connexion", signIn);

export default UserRoutes;
