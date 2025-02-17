import { NextFunction, Request, Response } from "express";
import Hotel from "../infrastructure/schemas/Hotel";
import NotFoundError from "../domain/not-found-error";
import ValidationError from "../domain/errors/validation-error";

export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
    return;
  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newHotel = req.body;

    // add validation here
    if (
      !newHotel.name ||
      !newHotel.location ||
      !newHotel.image ||
      !newHotel.rating ||
      !newHotel.reviews ||
      !newHotel.price
    ) {
      throw new ValidationError("Invalid hotel data");
    }

    await Hotel.create({
      name: newHotel.name,
      location: newHotel.location,
      image: newHotel.image,
      rating: parseInt(newHotel.rating),
      reviews: parseInt(newHotel.reviews),
      price: parseInt(newHotel.price),
    });
    res.status(201).send();
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findByIdAndDelete(hotelId);

    if (!hotel) {
      throw new NotFoundError("Hotel not found");
    }

    res.status(204).send();
    return;
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.id;
    const updatedHotel = req.body;

    // add validation here
    if (
      !updatedHotel.name ||
      !updatedHotel.location ||
      !updatedHotel.image ||
      !updatedHotel.rating ||
      !updatedHotel.reviews ||
      !updatedHotel.price
    ) {
      throw new ValidationError("Invalid hotel data");
    }

    await Hotel.findByIdAndUpdate(hotelId, updatedHotel);

    res.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
};
