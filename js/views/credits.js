var app = app || {};

app.CreditsView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		var template = _.template($("#credit-template").html(), {});
		this.$el.html(template);
		return this;
	}
});
