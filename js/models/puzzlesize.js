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

	rows: function() {
		return parseInt(this.get('rows'));
	},

	cols: function() {
		return parseInt(this.get('cols'));
	},

	validationSetup: function() {
		this.validators = {};

		var isDigitRegex = /[0-9]+/;
		var isValidSize = (n) => n % 5 == 0 && n > 0; // n must be divisible by 5 and > 0.
		var isValid = (val) => val && isDigitRegex.test(val) && isValidSize(parseInt(val));

		this.validators.rows = function(value) {
			return (isValid(value)) ? { success: true } : { success: false, errMsg: "Invalid puzzle size: rows." }
		}

		this.validators.cols = function(value) {
			return (isValid(value)) ? { success: true } : { success: false, errMsg: "Invalid puzzle size: columns." }
		}
	},

	validate: function() {
		for (let attr in this.validators) {
			if (attr && this.validators[attr]) {
				let eval = this.validators[attr](this.get(attr));
				if (eval.success == false)
					return eval;
			}
		}
		return { success: true };
	}
});