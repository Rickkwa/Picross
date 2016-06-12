var app = app || {};

app.CreditsView = Backbone.View.extend({
	template: _.template($("#credit-template").html()),

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template);
		return this;
	}
});
