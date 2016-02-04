// --------------------------------------------------
// CATEGORIES SERVICE
// --------------------------------------------------

// Import dependencies
var Service = require('lib/DB/service');

var CategoriesService = new Service({
	table  : 'categories'
});

module.exports = CategoriesService;