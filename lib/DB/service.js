// --------------------------------------------------
// SERVICE
// --------------------------------------------------

// Configuration
var config = require('config');

// Import dependencies
var _ = require('lodash');
var r = require('lib/DB/r');

var Service = function(settings) {
	this.table  = settings.table || '';
	// this.schema = settings.schema || require('./schemas/' + this.table + '.js') || '';

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
	var self = this;

	// Check if there is a custom insert function
	if (_.isFunction(self._normalize)) {
		data = self._normalize(data);
	}

	return r.table(this.table).insert(data).run();
};

// Update a record
Service.prototype.update = function Service_update(id, data) {
	return r.table(this.table).get(id).update(data).run();
};

// Delete a record
Service.prototype.delete = function Service_delete(id) {
	return r.table(this.table).get(id).delete().run();
};

Service.prototype.run = function Service_run(query) {
	return query.run();
}

module.exports = Service;