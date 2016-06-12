var app = app || {};

app.PuzzleView = Backbone.View.extend({
	template: _.template($("#puzzle-template").html()),

	initialize: function() {
	},

	render: function() {
		this.$el.html(this.template());
	},

	events: {
		"click .do-print": "printDialog"
	},

	printDialog: function() {
		window.print();
	}
});