import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	favorites: {
		type: [String],
		default: ["67d94f60294961d17c5f8d37"],
	},
});

export default mongoose.model("User", userSchema);
