const mongoose = require('mongoose');

const ImageDetailsSchema = new mongoose.Schema(
	{
		image: String,
		userEmail: String
	},
	{
		collection: "ImageDetails"
	}
);

mongoose.model("ImageDetails", ImageDetailsSchema);
