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
		this.gridModel = null;

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
		// Encode the grid and send to route
		app.router.navigate("puzzle/" + this.gridModel.encode(), true);
	},

	tileHandler: function(e) {
		e.preventDefault();

		// Handles mouseover and mousedown events
		switch (e.buttons) {
			case 1: // left click
				app.utils.setTile(this.gridModel, $(e.target), 1);
				break;
			case 2: // right click
				app.utils.setTile(this.gridModel, $(e.target), 0);
				break;
		}
	},

	newPuzzle: function() {
		// Get size
		var size = this.collection.at($("#size-index", this.$el).val());

		// TODO: Validate size

		// TODO: confirm they want to leave

		// Draw a new grid
		var $container = $(".grid-container");
		this.gridModel = new app.Grid({ size: size });
		this.drawGrid($container);
		// TODO: Change tile size based on container width
	},

	drawGrid: function($container) {
		var $table = $("<table></table>");

		for (let r = 0; r < this.gridModel.getRows(); r++) {
			let $row = $("<tr></tr>");
			for (let c = 0; c < this.gridModel.getCols(); c++) {
				let $col = $("<td></td>");
				$col.addClass("grid-tile");

				if (r > 0 && r % 5 == 0)
					$col.addClass("top-landmark-tile");
				if (c > 0 && c % 5 == 0)
					$col.addClass("left-landmark-tile");

				$col.data("coords", { row: r, col: c });
				$row.append($col);
			}
			$table.append($row);
		}
		$container.empty().append($table);
	}
});
