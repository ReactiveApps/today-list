// --------------------------------------------------
// USERS SERVICE
// --------------------------------------------------

// Import dependencies
var _       = require('lodash');
var bcrypt  = require('bcrypt');
var jwt     = require('jwt-simple');
var moment  = require('moment-timezone');
var r       = require('lib/DB/lib/r');
var Service = require('lib/DB/service');

var UsersService = new Service({
	table  : 'users'
});

// Get a user by email
UsersService.getByEmail = function UsersService_getByEmail(email) {
	var self = this;
	return new Promise(function(resolve, reject) {
		r.table(self.table).getAll(email, {index: 'email'})
			.run()
			.then(function(results) {
				if (_.isArray(results)) {
					resolve(results[0]);
				}

				else {
					resolve(null);
				}
			}, function(err) {
				reject(err);
			});
	});
};

// Authenticate a user
UsersService.auth = function UsersService_auth(email, password) {
	var self = this;
	return new Promise(function(resolve, reject) {
		self.getByEmail(email)
			.then(function(user) {
				if (user) {

					// Check the password
					if (bcrypt.compareSync(password, user.password)) {

						// Create a payload for the JWT
						var payload = {
							sub : user.id,
							exp : moment().add(30, 'days').unix(),
							iat : moment().unix()
						};

						var token = jwt.encode(payload, 'my_secret');

						resolve(token);
					}

					else {
						reject(new Error('The password was incorrect'));
					}

				}

				else {
					reject(new Error('User could not be found'));
				}
			});
	});
};

module.exports = UsersService;