// --------------------------------------------------
// TASKS SCHEMA
// --------------------------------------------------

module.exports = {

	fields : {

		status : {
			type : 'string',
			possible_values : [
				'pending',
				'complete'
			]
		}

	}

};