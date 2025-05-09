import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import { encode, decode } from "js-base64";
import { Error } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware, AuthRequest } from "../../middleware";
import { JWT_SECRET } from "../../config";
import { prisma } from "../../config/config";

// Create a new instance of the Express Router
const UserRouter = Router();


// @route    GET api/users/username
// @desc     Is username available
// @access   Public
UserRouter.get("/username", async (req, res) => {
  console.log('username')
});

UserRouter.get("/create-sample", async (req, res) => {
  const newUser = await prisma.user.create({
    data: {
      name: "Comet",
      email: "testdev@gmail.com"
    }
  })

  console.log("new created user: ", newUser);

  const allUsers = await prisma.user.findMany();
  res.json(allUsers)
})

export default UserRouter;
