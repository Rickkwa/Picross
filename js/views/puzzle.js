var app = app || {};

app.PuzzleView = Backbone.View.extend({
	template: _.template($("#puzzle-template").html()),

	initialize: function() {
		if (this.model) {
			this.gridModel = this.model;
			this.drawGridModel = new app.Grid({ size: this.gridModel.get('size') });
			this.completed = false;
		}
	},

	render: function() {
		this.$el.html(this.template());

		if (this.model)
			this.drawPuzzle($(".grid-container"));
		else
			this.displayDecodeError();

		$(".fill-control").prop("checked", true);

		return this;
	},

	events: {
		"click .do-print": "printDialog",
		"mousedown .grid-tile": "tileHandler",
		"mouseover .grid-tile": "tileHandler"
	},

	tileHandler: function(e) {
		e.preventDefault();

		if (this.completed || ![1, 2].includes(e.buttons))
			return;

		let $target = $(e.target);

		let {row, col} = $target.data("coords");
		let clickClass = $(".fill-control").prop("checked") ? "fill" : "block";

		let state = null;

		// Handles mouseover and mousedown events
		switch (e.buttons) {
			case 1: // left click
				state = 1;
				break;
			case 2: // right click
				state = 0;
				break;
		}

		let canFill = clickClass == "fill" && !$target.hasClass("block");
		let canBlock = clickClass == "block" && !$target.hasClass("fill");
		if (canFill)
			this.drawGridModel.setState(row, col, state);

		if (canFill || canBlock) {
			$target.removeClass("fill block");
			app.utils.setTile($target, clickClass, state);
		}

		// TODO: Add an option that notifies the user if they're wrong when they fill in a tile

		// Check if the puzzle was successfully finished
		// If so, lock the puzzle and give feedback
		if (this.drawGridModel.equals(this.gridModel)) {
			this.completed = true;
			this.handleCompletion();
		}
	},

	blockTile: function($target, state) {
		if (state == 1)
			$target.addClass("blocK");
		else
			$target.removeClass("block");
	},

	handleCompletion: function() {
		$(".grid-container td, .grid-container .block").not(".fill").addClass("trans-text");
		$(".grid-container td").addClass("trans-border");
		$(".controls input").prop("disabled", true);
	},

	drawPuzzle: function($container) {
		var hints = this.getHints();

		var totalRows = this.gridModel.getRows() + hints.colHints.maxSize;
		var totalCols = this.gridModel.getCols() + hints.rowHints.maxSize;

		// Pad them both by mapping each of them
		var rHints = hints.rowHints.hints.map(arr => app.utils.arrLeftPad(arr, " ", hints.rowHints.maxSize));
		var cHints = hints.colHints.hints.map(arr => app.utils.arrLeftPad(arr, " ", hints.colHints.maxSize));

		var $table = $("<table></table>");
		for (let r  = 0; r < totalRows; r++) {
			let $row = $("<tr></tr>");
			for (let c = 0; c < totalCols; c++) {
				let $col = $("<td></td>");
				if (r < hints.colHints.maxSize) {
					if (c >= hints.rowHints.maxSize) {
						// Make top hint
						$col.addClass("top-hint-tile");
						$col.text(cHints[c - hints.rowHints.maxSize][r]);
					} 
					else
						$col.addClass("hide");
				}
				else {
					if (c < hints.rowHints.maxSize) {
						// Make left hint
						$col.addClass("left-hint-tile");
						$col.text(rHints[r - hints.colHints.maxSize][c]);
					}
					else {
						// Draw playing tile
						$col.addClass("grid-tile");
						$col.data("coords", { row: (r - hints.colHints.maxSize), col: (c - hints.rowHints.maxSize) });
						if ((c - hints.rowHints.maxSize) % 5 == 0)
							$col.addClass("left-landmark-tile");
						if ((r - hints.colHints.maxSize) % 5 == 0)
							$col.addClass("top-landmark-tile");
					}
				}
				if (c == hints.rowHints.maxSize - 1 || r == hints.colHints.maxSize - 1)
					$col.addClass("edge");

				$row.append($col);
			}
			$table.append($row);
		}
		$container.empty().append($table);
	},

	getHints: function() {
		/* Return an object of form:
			{
				rowHints: {
					maxSize: int // max # of columns to hold all hints
					hints: [[]] // row and col of hint
				},
				colHints: ...
			}
		*/
		var [rMaxSize, cMaxSize] = [0, 0];
		var [rHints, cHints] = [[], []];

		var rows = this.gridModel.get('grid');
		var cols = app.utils.transpose(rows);

		// Do rows
		for (let r = 0; r < rows.length; r++) {
			let hints = this._hintsFrom1DArray(rows[r]);
			rMaxSize = Math.max(rMaxSize, hints.length);
			rHints.push(hints);
		}

		// Do cols
		for (let c = 0; c < cols.length; c++) {
			let hints = this._hintsFrom1DArray(cols[c]);
			cMaxSize = Math.max(cMaxSize, hints.length);
			cHints.push(hints);
		}

		return { 
			rowHints: { maxSize: rMaxSize, hints: rHints }, 
			colHints: { maxSize: cMaxSize, hints: cHints }
		};
	},

	displayDecodeError: function() {
		$(".instructions").html("Error: Invalid puzzle.");
		$(".controls").hide();
	},

	printDialog: function() {
		window.print();
	},

	_hintsFrom1DArray: function(arr) {
		// Given 1D array of binary (whether it represent the row or column), return the hints for it as an array

		// Create binary string
		var bin = arr.join("");

		// Trim leading/trailing 0s
		bin = bin.replace(/(^[0]+|[0]+$)/g, "");

		// Split by 0s, and count each element
		return bin.split(/[0]+/).map(v => v.length);
	}
});