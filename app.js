const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const cors = require("cors");
const JsonWebToken = require("jsonwebtoken"); //authentication
const bodyParser = require('body-parser');
// Authentication
const Bcrypt = require("bcryptjs");


const app = express();
const port = process.env.PORT || 3000;
// Cross-Origin Resource Sharing (CORS) - Mechanism by which front-end client can make requests for resources to an external back-end server
var corsOptions = {
	origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
//const SECRET_JWT_CODE = "psmR3Hu0ihHkfqZymo1m";

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(bodyParser.json())
const db = require("./app/models"); //authentication
const Role = db.role; //authentication
// Require Event Routes
require('./app/routes/event.routes.js')(app);
require('./app/routes/auth.js')(app);
require('./app/routes/user.js')(app);

// Authentication
db.mongoose
	.connect('mongodb+srv://idammix:currency@cluster0.gh4jygf.mongodb.net/?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Successfully connect to MongoDB.");
		initial();
	})
	.catch((err) => {
		console.error("Connection error", err);
		process.exit();
	});

app.get('/', (req, res) => {
		res.json({"message": "Welcome Event Management System"});
	});

app.listen(port, () => {
		console.log(`Server listening at http://localhost:${port}`);
	});

function initial() {
	Role.estimatedDocumentCount((err, count) => {
		if(!err && count === 0) {
			new Role({
				name: "user"
			}).save(err => {
				if(err) {
					console.log("error", err);
				}

				console.log("added 'user' to roles collection");
			});

			new Role({
				name: "moderator"
			}).save(err => {
				if(err) {
					console.log("error", err);
				}

				console.log("added 'moderator' to roles collection");
			});

			new Role({
				name: "admin"
			}).save(err => {
				if(err) {
					console.log("error", err);
				}

				console.log("added 'admin' to roles collection");
			});
		}
	});
}
