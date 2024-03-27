const mongoose = require('mongoose')

const dialectSchema = mongoose.Schema({
	title: String,
	kzMeaning: String,
	enMeaning: String,
	ruMeaning: String, 
	kzRegion: String,
	enRegion: String,
	ruRegion: String,
	hide: Boolean,
	zone: String
})

module.exports = mongoose.model("dialects", dialectSchema);