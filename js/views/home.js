var app = app || {};

app.HomeView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		var template = _.template($("#home-template").html(), {});
		this.$el.html(template);
		return this;
	}
});
