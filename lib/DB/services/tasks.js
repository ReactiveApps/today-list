// --------------------------------------------------
// CATEGORIES SERVICE
// --------------------------------------------------

// Import dependencies
var r       = require('lib/DB/r');
var Service = require('lib/DB/service');

var TasksService = new Service({
	table  : 'tasks'
});

TasksService.getByList = function TasksService_getByList(list_id) {
	var self = this;
	return r.table(self.table).getAll(list_id, {index: 'list_id'}).run();
};

module.exports = TasksService;