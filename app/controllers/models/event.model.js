const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
	title: String,
	location: String,
	description: String
	}, {
	timestamps: true
	});

//const UserSchema = new mongoose.Schema({
//	email: {
//		type: String,
//		unique: true,
//		required: true,
//		lowercase: true,
//		trim: true
//	},
//	password: {
//		type: String,
//		required: true
//	}
//}, { collection: "users" });

module.exports = mongoose.model('Event', EventSchema);
//exports.User = mongoose.model('User', UserSchema);