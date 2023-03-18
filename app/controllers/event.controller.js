const Event = require('../models/event.model.js');

exports.create = (req, res) => {
	if(!req.body.description) {
		return res.status(400).send({
			message: "Event content can not be empty"
		});
	}

	const event = new Event({
		title: req.body.title || "Untitled Event",
		location: req.body.location,
		description: req.body.description
	});

	event.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occured while creating the Event."
		});
	});
};

exports.findAll = (req, res) => {
	Event.find()
	.then(event => {
		res.send(event);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving event description."
		});
	});
};

exports.findOne = (req, res) => {
	Event.findById(req.params.eventId)
	.then(event => {
		if(!event) {
			return res.status(404).send({
				message: "Event not found with id " + req.params.eventId
			});
		}
		res.send(event);
	}).catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "Event not found with id " + req.params.eventId
			});
		}
		return res.status(500).send({
			message: "Error retrieving event with id " + req.params.eventId
		});
	});
};

exports.update = (req, res) => {
	if(!req.body.description) {
		return res.status(400).send({
			message: "Event description can not be empty"
		});
	}

	Event.findByIdAndUpdate(req.params.eventId, {
		title: req.body.title || "Untitled Event",
		location: req.body.location,
		description: req.body.description
	}, {new: true})
	.then(event => {
		if(!event) {
			return res.status(404).send({
				message: "Event not found with id " + req.params.eventId
			});
		}
		res.send(event);
	}).catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "Event not found with id " + req.params.eventId
			});
		}
		return res.status(500).send({
			message: "Error updating event with id " + req.params.eventId
		});
	});
};

exports.delete = (req, res) => {
	Event.findByIdAndRemove(req.params.eventId)
	.then(event => {
		if(!event) {
		return res.status(404).send({
			message: "Event not found with id " + req.params.eventId
		});
	}
	res.send({message: "Event deleted successfully!"});
}).catch(err => {
	if(err.kind === 'ObjectId' || err.name === 'NotFound') {
		return res.status(404).send({
			message: "Event not found with id " + req.params.eventId
		});
	}
	return res.status(500).send({
		message: "Could not delete event with id " + req.params.eventId
	});
});
};