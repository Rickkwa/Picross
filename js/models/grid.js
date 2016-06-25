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

	numberOfFilled: function() {
		// Return the number of filled grid tiles

		return _.flatten(this.get('grid')).reduce((x, y) => x + y);
	},

	equals: function(otherGrid) {
		var thisFlat = _.flatten(this.get('grid'));
		var otherFlat = _.flatten(otherGrid.get('grid'));
		return thisFlat.join("") == otherFlat.join("");
	},

	encode: function() {
		// Encode the 2D grid into a 1D value

		var numRowBlocks = this.getRows() / 5;
		var numColBlocks = this.getCols() / 5;

		var result = "";
		for (let r = 0; r < numRowBlocks; r++) { // block row
			for (let c = 0; c < numColBlocks; c++) { // block col
				let curBlock = "";
				for (let innerR = r * 5; innerR < r * 5 + 5; innerR++) // iterate thru rows in current block
					curBlock += this.get('grid')[innerR].slice(c * 5, c * 5 + 5).join("");
				result += this.compressBlock(curBlock);
			}
			result += ",";
		}
		return result.substr(0, result.length - 1);
	},

	decode: function(str) {
		// Decode the string and set the model's size and grid to reflect

		var blockRows = str.split(",");
		var puzzleSize = new app.PuzzleSize({ rows: blockRows.length * 5, cols: blockRows[0].length });
		if (puzzleSize.validate().success == false)
			throw "Invalid size of puzzle. Rows/cols should be in multiples of 5.";

		this.set({ 'size' : puzzleSize });
		this.clearGrid();

		for (let blockR = 0; blockR < blockRows.length; blockR++) {
			for (let blockC = 0; blockC < blockRows[0].length / 5; blockC++) { 
				// for 5 charcters (representing the binary of 5 rows) starting from blockRows[blockR][blockC * 5]
				for (let i = 0; i < 5; i++) {
					// Decode each character and put setState appropriately
					let dec = this.decodeCharToNum(blockRows[blockR][blockC * 5 + i]);
					let bin = app.utils.leftPad(app.utils.dec2bin(dec), "0", 5);
					for (let j = 0; j < bin.length; j++) {
						this.setState(blockR * 5 + i, blockC * 5 + j, bin.charAt(j));
					}
				}
			}
		}
	},

	compressBlock: function(bin) {
		// Given a 5x5 block represented as a 25 character binary string, return the encoded version
		if (bin.length != 25)
			throw "Decode block size is invalid.";

		var result = "";
		for (let i = 0; i < 25; i += 5) {
			let dec = parseInt(bin.substr(i, 5), 2);
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