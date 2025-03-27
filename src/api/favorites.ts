import express from "express";
import {
	addFavorite,
	getFavorites,
	removeFavorite,
} from "../application/favorites";
import { isAuthenticated } from "./middlewares/authentication-middleware";

const favoritesRouter = express.Router();

favoritesRouter
	.route("/")
	.get(getFavorites)
	.post(addFavorite)
	.delete(removeFavorite);

export default favoritesRouter;
