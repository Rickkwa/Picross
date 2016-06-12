var app = app || {};

app.Grid = Backbone.Model.extend({
	defaults: {
		size: null,
		grid: []
	},

	initialize: function() {
		// Create the 2D array and initialize to 0
		let rows = this.get('size').rows();
		let cols = this.get('size').cols();
		for (let r = 0; r < rows; r++) {
			this.get('grid').push([]);
			for (let c = 0; c < cols; c++)
				this.get('grid')[r][c] = 0;
		}
	},

	getRows: function() {
		return this.get('size').rows();
	},

	getCols: function() {
		return this.get('size').cols();
	},

	setState: function(r, c, val) {
		this.get('grid')[r][c] = parseInt(val);
	},

	getState: function(r, c) {
		return this.get('grid')[r][c];
	},

	encode: function() {
		// Encode the 2D grid into a 1D value

		// TEMPORARY SOLUTION FOR THE SAKE OF PROGRESS
		// Return comma separated list of binary strings of the rows
		var result = "";
		for (let r = 0; r < this.getRows(); r++) {
			for (let c = 0; c < this.getCols(); c++) {
				result += this.getState(r, c);
			}
			result += ",";
		}
		result = result.substr(0, result.length - 1);
		return result;
	},

	decode: function(str) {
		// Decode the string and set the model's size and grid to reflect
		var rows = str.split(",");
		for (let row of rows) {
			for (let col = 0; col < row.length; col++) {
				this.setState(row, col, row[col]);
			}
		}
		this.get('size') = new app.PuzzleSize({ rows: rows.length, cols: rows[0].length });
	}
});