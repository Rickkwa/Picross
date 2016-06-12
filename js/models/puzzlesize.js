var app = app || {};

app.PuzzleSize = Backbone.Model.extend({
	defaults: {
		rows: 15,
		cols: 15,
		defaultSelected: false
	},

	initialize: function() {
		this.validationSetup();
	},

	validationSetup: function() {
		this.validators = {};

		var isDigitRegex = /[0-9]+/;

		this.validators.rows = function(value) {
			return (value && isDigitRegex.test(value) && parseInt(value) % 5 == 0) ? { success: true } : { success: false, errMsg: "Invalid puzzle size: rows." }
		}

		this.validators.cols = function(value) {
			return (value && isDigitRegex.test(value) && parseInt(value) % 5 == 0) ? { success: true } : { success: false, errMsg: "Invalid puzzle size: columns." }
		}
	}
});