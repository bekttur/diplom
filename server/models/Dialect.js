const mongoose = require('mongoose')

const dialectSchema = mongoose.Schema({
	title: String,
	kzMeaning: String,
	enMeaning: String,
	ruMeaning: String, 
	region: Array,
	hide: Boolean,
	zone: Array
})

module.exports = mongoose.model("dialects", dialectSchema);