import { Request, Response, NextFunction } from "express";
import User from "../infrastructure/schemas/User";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/not-found-error";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body;

    // add validation here
    if (!newUser.name || !newUser.email) {
      throw new ValidationError("Invalid user data");
    }

    await User.create({
      name: newUser.name,
      email: newUser.email,
    });
    res.status(201).send();
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
    return;
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json(user);
    return;
  } catch (error) {
    next(error);
  }
};
