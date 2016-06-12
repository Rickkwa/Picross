var app = app || {};

app.CreateView = Backbone.View.extend({
	template: _.template($("#create-template").html()),

	initialize: function() {
		// this.render();
	},

	render: function() {
		this.$el.html(this.template({ sizes: this.collection })); // Sending collection to view: http://jsfiddle.net/superhacker/P2JR8/3/

		// Draw the initial grid
		this.newPuzzle();
		
		return this;
	},

	events: {
		"click #create-btn": "doCreate",
		"change #size-index": "newPuzzle"
	},

	doCreate: function() {
		// encode the grid
		// Send to route
	},

	newPuzzle: function() {
		// Get size
		var size = this.collection.at($("#size-index", this.$el).val());
		console.log(size.toJSON());

		// TODO: Validate size

		// TODO: confirm they want to leave

		// Draw a new grid
	}
});
