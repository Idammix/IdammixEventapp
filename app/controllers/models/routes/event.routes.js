// Authentication
//app.post("/user/signup", (req, res) => {
//	if (!req.body.email || !req.body.password) {
//		res.json({ success: false, error: "Send needed params" })
//		return
//	}
//
//	Database.User.create({
//		email: req.body.email,
//		passwordP: Bcrypt.hashSync(req.body.password, 10),
//	}).then((user) => {
//		const token = JsonWebToken.sign({ id: user._id, email:  user.email }, SECRET_JWT_CODE)
//		res.json({ success: true, token: token })
//	}).catch((err) => {
//		res.json({ success: false, error: err })
//	})
//})

// Login using Email and Password
//app.post("user/login", (req, res) => {
//	if (!req.body.email || !req.body.password) {
//		res.json({ success: false, error: "Send needed params" })
//		return
//	}

//	Database.User.findOne({ email: req.body.email })
//	.then((user) => {
//		if (!user) {
//			res.json({ success: false, error: "User does not exist" })
//		} else {
//			if (!Bcrypt.compareSync(req.body.password, user.password)) {
//				res.json({ success: false, error: "Wrong password" })
//			} else {
//				const token = JsonWebToken.sign({ id: user._id, email: user.email }, SECRET_JWT_CODE)
//				res.json({ success: true, token: token, })
//			}
//		}
//	})
//	.catch((err) => {
//		res.json({ success: false, error: err })
//	})
//})

module.exports = (app) => {
	const event = require('../controllers/event.controller.js');

	app.post('/event', event.create);

	app.get('/event', event.findAll);

	app.get('/event/:eventId', event.findOne);

	app.put('/event/:eventId', event.update);

	app.delete('/event/:eventId', event.delete);
}