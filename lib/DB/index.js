// --------------------------------------------------
// DATABASE LIBRARY
// --------------------------------------------------

// Configuration
var config = require('config');

// Import dependencies
var _     = require('lodash');
var async = require('async');
var fs    = require('fs');
var path  = require('path');

var DB = {

	runAll : function(queries) {

	}

};

// Register all of our services
_.forEach(fs.readdirSync(__dirname + '/services'), function(file) {
	if (path.extname(file) == '.js') {
		DB[path.basename(file, '.js')] = require(__dirname + '/services/' + file);
	}
});

module.exports = DB;