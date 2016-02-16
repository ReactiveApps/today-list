// --------------------------------------------------
// LISTS SERVICE
// --------------------------------------------------

// Import dependencies
var r       = require('lib/DB/r');
var Service = require('lib/DB/service');

var ListsService = new Service({
	table  : 'lists'
});

ListsService.getByDate = function ListsService_getByDate(date) {
	var self = this;
	return r.table(self.table).getAll(date, {index: 'date'}).nth(0).default(null).run();
};

module.exports = ListsService;