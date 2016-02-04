// --------------------------------------------------
// TO-DAY LIST API SERVER
// --------------------------------------------------

// Import the config
var config = require('config');

// Import dependencies
var _       = require('lodash');
var DB      = require('lib/DB');
var express = require('express');
var fs      = require('fs');
var moment  = require('moment-timezone');
var r       = require('lib/DB/r');

// Initialize express app
var app = express();

app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Site Router
var site_router = express.Router();

// Login route
site_router.route('/')
	.get(function(req, res) {
		res.render('login');
	});

// Main list route
site_router.route('/today')
	.get(function(req, res) {
		res.render('list', {
			today : moment().format('ddd - MMM D, YYYY')
		});
	});


// API Router
var api_router = express.Router();

// Use the JSON body parser for all API routes
api_router.use('/', require('body-parser').json());

// api_router.use('/', function(req, res, next) {
// 	console.log(req);
// 	next();
// });

// API Home
api_router.route('/')
	.get(function(req, res) {
		res.status(200).json({
			status : 'OK'
		});
	});

// Auth route
api_router.route('/auth')
	.post(function(req, res) {
		DB.users.auth(req.body.email, req.body.password)
			.then(function(token) {
				res.status(200).json({
					token : token
				});
			}, function(err) {
				res.status(401).json({
					error   : 'Authentication Error',
					message : err.message
				});
			});
	});

// Basic table routes
api_router.route('/:table')

	// Get records from database
	.get(function(req, res) {

		// Get records from database table
		DB[req.params.table].get()
			.then(function(result) {
				res.status(200).json(result);
			})
			.error(function(err) {
				res.status(500).json({
					error : err.message
				});
			});

	})

	// Insert record into database
	.post(function(req, res) {

		// Get records from database table
		r.db('ToDay_List').table(req.params.table)
			.insert(req.body)
			.run()
			.then(function(result) {
				res.status(200).json(result);
			})
			.error(function(err) {
				res.status(500).json({
					error : err.message
				});
			});

	});

// Basic record routes
api_router.route('/:table/:id')

	// Get a specific record by ID
	.get(function(req, res) {

		// Get records from database table
		r.db('ToDay_List').table(req.params.table).get(req.params.id)
			.run()
			.then(function(result) {
				res.status(200).json(result);
			})
			.error(function(err) {
				res.status(500).json({
					error : err.message
				});
			});

	})

	// Update a record by ID
	.patch(function(req, res) {

		// Get records from database table
		r.db('ToDay_List').table(req.params.table).get(req.params.id)
			.update(req.body)
			.run()
			.then(function(result) {
				res.status(200).json(result);
			})
			.error(function(err) {
				res.status(500).json({
					error : err.message
				});
			});

	})

	// Delete a record by ID
	.delete(function(req, res) {

		// Get records from database table
		r.db('ToDay_List').table(req.params.table).get(req.params.id)
			.delete()
			.run()
			.then(function(result) {
				res.status(200).json(result);
			})
			.error(function(err) {
				res.status(500).json({
					error : err.message
				});
			});

	});

// Assign site routes to the root
app.use('/', site_router);

// Assign API routes to the api sub-folder
app.use('/api', api_router);

// Start listening for traffic
app.listen(3000, function() {
	console.log('Listening on port 3000...');
});