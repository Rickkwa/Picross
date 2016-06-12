var app = app || {};

class DrawGrid {

}

app.CreateView = Backbone.View.extend({
	template: _.template($("#create-template").html()),

	initialize: function() {
		// this.render();
	},

	render: function() {
		this.$el.html(this.template({ sizes: this.collection })); // Sending collection to view: http://jsfiddle.net/superhacker/P2JR8/3/

		// Global model
		this.grid = null;

		// Draw the initial grid
		this.newPuzzle();

		return this;
	},

	events: {
		"click #create-btn": "doCreate",
		"change #size-index": "newPuzzle",
		"mousedown .grid-tile": "tileHandler",
		"mouseover .grid-tile": "tileHandler"
	},

	doCreate: function() {
		// encode the grid
		// Send to route
		console.log("Click");
	},

	tileHandler: function(e) {
		// Handles mouseover and mousedown events
		switch (e.buttons) {
			case 1: // left click
				this.setTile($(e.target), 1);
				break;
			case 2: // right click
				this.setTile($(e.target), 0);
				break;
		}
	},

	setTile: function($tile, state) {
		// Fill/Unfill the tile based on state
		// Set the grid model to reflect

		if (this.grid) {
			if (state == 1)
				$tile.addClass("fill");
			else
				$tile.removeClass("fill");

			let {row, col} = $tile.data("coords");
			this.grid.setState(row, col, state);
		}
	},

	newPuzzle: function() {
		// Get size
		var size = this.collection.at($("#size-index", this.$el).val());

		// TODO: Validate size

		// TODO: confirm they want to leave

		// Draw a new grid
		var $container = $(".grid-container");
		this.grid = new app.Grid({ size: size });
		this.drawGrid($container, this.grid);
		// TODO: Change tile size based on container width
	},

	drawGrid: function($container, gridModel) {
		var $table = $("<table></table>");

		for (let r = 0; r < gridModel.getRows(); r++) {
			let $row = $("<tr></tr>");
			for (let c = 0; c < gridModel.getCols(); c++) {
				let $col = $("<td></td>");
				$col.addClass("grid-tile");
				$col.data("coords", { row: r, col: c });
				$col.data("coordsStr", r + "-" + c);
				$row.append($col);
			}
			$table.append($row);
		}
		$container.empty().append($table);
	}
});
