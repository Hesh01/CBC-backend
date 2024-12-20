import express from 'express';
import { newUser } from '../Controllers/user/UserSignUP.js';
import { loginUser } from '../Controllers/user/UserSignIN.js';
import { deleteUser } from '../Controllers/user/UserDelete.js';
import { userLogout } from '../Controllers/user/UserLogout.js';

const userRouter = express.Router();

userRouter.post("/signUp", newUser)
userRouter.post("/signIn", loginUser)
userRouter.delete("/" , deleteUser)
userRouter.get("/" ,userLogout)

export default userRouter;