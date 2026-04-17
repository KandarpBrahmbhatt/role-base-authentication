import express from "express";
import isAuth from "../middleware/auth.middleware.js";
// import authorize from "../middleware/role.middleware.js";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";
import authorizeRoles from "../middleware/isAdmin.js";

const userRouter = express.Router();

// //  Admin Only
// userRouter.post("/create",isAuth,isAdmin, createUser);
// userRouter.put("/:id", isAuth, isAdmin, updateUser);
// userRouter.delete("/:id", isAuth, isAdmin, deleteUser);

// // //  Admin + User (both have READ_USER)
// // userRouter.get("/", isAuth, authorize("read"), getUsers);

// export default userRouter;

// import authorizeRoles from "../middleware/role.middleware.js";

userRouter.post("/create", isAuth, authorizeRoles("admin"), createUser);

userRouter.put("/:id", isAuth, authorizeRoles("admin", "manager"), updateUser);

userRouter.get("/", isAuth, authorizeRoles("admin", "manager"), getUsers);

userRouter.delete("/:id", isAuth, authorizeRoles("admin"), deleteUser);

export default userRouter;