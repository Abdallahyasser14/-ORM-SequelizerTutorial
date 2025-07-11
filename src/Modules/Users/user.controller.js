import { Router } from "express";
const userController =Router();

import * as userServices from "./Services/user.service.js"
userController.post('/signup',userServices.SignupService)

userController.put('/update/:userID', userServices.UpdateServiceasync);











export default userController;