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
		return "";
	}
});