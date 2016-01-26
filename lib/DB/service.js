// --------------------------------------------------
// SERVICE
// --------------------------------------------------

// Configuration
var config = require('config');

// Import dependencies
var r = require('lib/DB/r');

var Service = function(settings) {
	this.table  = settings.table || '';
	this.schema = settings.schema || require('./services/' + this.table + '.schema.js') || '';

	return this;
};

// Get records from the table
Service.prototype.get = function(id) {

	// Get a record by ID
	if (id) {
		return r.table(this.table).get(id).run();
	}

	else {
		return r.table(this.table).run();	
	}
};

// Insert a new record into the table
Service.prototype.insert = function(data) {

	return r.table(this.table).insert(data).run();

};

module.exports = Service;