// --------------------------------------------------
// TASKS SERVICE
// --------------------------------------------------

// Import dependencies
var Service = require('lib/DB/service');

var ListsService = new Service({
	table  : 'lists'
});

module.exports = ListsService;