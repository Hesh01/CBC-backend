import express from 'express';
import { newUser } from '../Controllers/user/UserSignUP.js';
import { loginUser } from '../Controllers/user/UserSignIN.js';
import { deleteUser } from '../Controllers/user/UserDelete.js';

const userRouter = express.Router();

userRouter.post("/", newUser)

userRouter.post("/login", loginUser)

userRouter.delete("/" , deleteUser)

export default userRouter;