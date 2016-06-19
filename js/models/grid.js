var app = app || {};

app.Grid = Backbone.Model.extend({
	defaults: {
		size: new app.PuzzleSize(),
		grid: []
	},

	initialize: function() {
		this.clearGrid();
	},

	clearGrid: function() {
		this.set({ 'grid' : [] });

		// Create the 2D array and initialize to 0
		let rows = this.get('size').rows();
		let cols = this.get('size').cols();
		for (let r = 0; r < rows; r++) {
			this.get('grid').push([]);
			for (let c = 0; c < cols; c++)
				this.get('grid')[r].push(0);
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

	equals: function(otherGrid) {
		var thisFlat = _.flatten(this.get('grid'));
		var otherFlat = _.flatten(otherGrid.get('grid'));
		return thisFlat.join("") == otherFlat.join("");
	},

	encode: function() {
		// Encode the 2D grid into a 1D value

		var result = "";

		for (let r = 0; r < this.getRows(); r++) {
			result += this.compressRow(r) + ",";
		}

		return result.substr(0, result.length - 1);
	},

	decode: function(str) {
		// Decode the string and set the model's size and grid to reflect

		var rows = str.split(",");
		var puzzleSize = new app.PuzzleSize({ rows: rows.length, cols: rows[0].length * 5 });

		if (puzzleSize.validate().success == false)
			throw "Invalid size of puzzle. Rows/cols should be in multiples of 5.";

		this.set({ 'size' : puzzleSize });
		this.clearGrid();

		for (let r = 0; r < rows.length; r++) {
			// for each character in rows[r]
				// convert character to decimal, and convert decimal to left padding binary
				// iterate through binary representation of the columns to set the state
			for (let i = 0; i < rows[r].length; i++) {
				let char = rows[r].charAt(i);
				let dec = this.decodeCharToNum(char);

				if (dec < 0 || dec > 31)
					throw "Decode out of range.";

				let bin = app.utils.leftPad(app.utils.dec2bin(dec), "0", 5);
				for (let c = 0; c < bin.length; c++) {
					this.setState(r, (i * 5) + c, bin.charAt(c));
				}
			}
		}
	},

	compressRow: function(rowIndex) {
		var bin = this.get('grid')[rowIndex].join("");
		var result = "";
		
		// Group columns in sets of 5 bits
		for (let i = 0; i < bin.length; i += 5) {
			let slice = bin.slice(i, i + 5);

			// Convert the 5 char binary to decimal
			let dec = parseInt(slice, 2);
			result += this.encodeNumToChar(dec);
		} 
		return result;
	},

	encodeNumToChar: function(num) {
		// num should be a decimal number in range [0, 31]
		// We will map 0 to 'a', 1 to 'b', etc. Then 25 will be z, and at 26-31 we will use 1-6

		num = parseInt(num);
		if (num <= 25)
			return String.fromCharCode(97 + num); // ASCII 97 is 'a'
		return (num - 25) + "";
	},

	decodeCharToNum: function(char) {
		// If char is a, then add 25 since 1 maps to 26, 2 to 27, ..., 6 to 31
		// else 'a' maps to 0, 'b' to 1, 'c' to 2, etc

		if (/^\d+$/.test(char))
			return parseInt(char) + 25;
		return char.charCodeAt(0) - 97; // 'a' is ASCII 97, and we want to return 0
	}
});