// --------------------------------------------------
// TASKS SERVICE
// --------------------------------------------------

// Configuration
var config = require('config');

// Import dependencies
var r = require('lib/DB/r');

function Service(settings) {
	this.table  = settings.table || '';
	this.schema = settings.schema || require('./' + this.table + '.schema.js');

	return this;
}

var TasksService = new Service({
	table  : 'tasks'
});

// Get records from the table
TasksService.get = function(id) {

	// Get a record by ID
	if (id) {
		return r.table(this.table).get(id).run();
	}

	else {
		return r.table(this.table).run();	
	}
};

// Insert a new record into the table
TasksService.insert = function(data) {

	if (data) {

		if (data.status) {
			if (typeof data.status != 'string') {
				Promise.reject(new Error('The status must be a string'));
			}

			if (data.status != 'pending' && data.status != 'complete') {
				Promise.reject(new Error('The status must be pending or complete'));
			}
		}

	}

	else {
		return Promise.reject(new Error('No data was given'));
	}

};