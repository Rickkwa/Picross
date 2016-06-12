var app = app || {};

app.CreateView = Backbone.View.extend({
	template: _.template($("#create-template").html()),

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template({ sizes: this.collection.toJSON() })); // Sending collection to view: http://jsfiddle.net/superhacker/P2JR8/3/
		return this;
	},

	events: {
		"click #create-btn": "doCreate"
		// "change #puzzle-size": "newPuzzle" // pseudo
	},

	doCreate: function() {
		// encode the grid
		// Send to route
	}
});
