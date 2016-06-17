var app = app || {};

app.ConfirmLeaveView = Backbone.View.extend({
	template: _.template($("#confirm-leave-template").html()),

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	}
});