const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	fullname: String,
	email: String,
	password: String, 
	role: String,
	address: String,
	city: String,
	birthday: String,
	gender: String,
	phone: Number,
})

module.exports = mongoose.model("users", userSchema);