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

		let {row, col} = $(e.target).data("coords");

		// Handles mouseover and mousedown events
		switch (e.buttons) {
			case 1: // left click
				app.utils.setTile($(e.target), "fill", 1);
				this.gridModel.setState(row, col, 1);
				break;
			case 2: // right click
				app.utils.setTile($(e.target), "fill", 0);
				this.gridModel.setState(row, col, 0);
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
		this.drawGrid($container, 600); // 600 is best size since 5, 10, 15, 20, 25 are all factors of it
		// console.log($(".create-right").width());
	},

	drawGrid: function($container, targetWidth) {
		var $table = $("<table></table>");
		$table.attr("align", "right");

		// Dynamically set cell width
		let cellWidth = targetWidth ? Math.floor(targetWidth / this.gridModel.getCols()) : null;

		for (let r = 0; r < this.gridModel.getRows(); r++) {
			let $row = $("<tr></tr>");
			for (let c = 0; c < this.gridModel.getCols(); c++) {
				let $col = $("<td></td>");
				$col.addClass("grid-tile");

				if (r > 0 && r % 5 == 0)
					$col.addClass("top-landmark-tile");
				if (c > 0 && c % 5 == 0)
					$col.addClass("left-landmark-tile");
				if (cellWidth)
					$col.css({ width: cellWidth + "px", height: cellWidth + "px" });

				$col.data("coords", { row: r, col: c });
				$row.append($col);
			}
			$table.append($row);
		}
		$container.empty().append($table);
	}
});
