// --------------------------------------------------
// TASKS SERVICE
// --------------------------------------------------

// Import dependencies
var Service = require('lib/DB/service');

var TasksService = new Service({
	table  : 'tasks'
});

TasksService.completeTask = function(id) {
	return r.table(this.table).get(id).update({status: 'complete'}).run();
}

TasksService.addToList = function(task_id, list_id) {
	
}

module.exports = TasksService;