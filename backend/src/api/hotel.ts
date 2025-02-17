import express from "express";
import {
  getAllHotels,
  getHotelById,
  createHotel,
  deleteHotel,
  updateHotel,
} from "../application/hotel";

const hotelsRouter = express.Router();

hotelsRouter.route("/").get(getAllHotels).post(createHotel);
hotelsRouter
  .route("/:id")
  .get(getHotelById)
  .delete(deleteHotel)
  .put(updateHotel);

export default hotelsRouter;
