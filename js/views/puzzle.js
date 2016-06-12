var app = app || {};

app.PuzzleView = Backbone.View.extend({
	template: _.template($("#puzzle-template").html()),

	initialize: function() {
	},

	render: function() {
		this.$el.html(this.template());

		this.grid = this.model;
		this.drawPuzzle();

		return this;
	},

	events: {
		"click .do-print": "printDialog"
	},

	drawPuzzle: function() {
		
	},

	printDialog: function() {
		window.print();
	}
});