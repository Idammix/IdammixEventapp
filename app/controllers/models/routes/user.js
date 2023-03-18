const { authJwt } = require("../../middlewares");
const controller = require("../controllers/user.js");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control_Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
			);
		next();
	});

	app.get("/event/test/all", controller.allAccess);

	app.get("/event/test/user", [authJwt.verifyToken], controller.userBoard);

	app.get(
		"/event/test/mod",
		[authJwt.verifyToken, authJwt.isModerator],
		controller.moderatorBoard
		);

	app.get(
		"/event/test/admin",
		[authJwt.verifyToken, authJwt.isAdmin],
		controller.adminBoard
		);
};