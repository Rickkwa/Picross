var app =  app || {};

app.AppRouter = Backbone.Router.extend({
	routes: {
		"": "home",
		"create": "create",
		"credits": "credit",
		"puzzle/:encode": "showPuzzle",
		"dishes/:encode/answer": "showAnswer"
	},

	initialize: function() {
		
	},

	home: function() {
		if (!this.homeView) {
			this.homeView = new app.HomeView();
		};
		$('#content').html(this.homeView.render().el);
		
		document.title = this.title() + " - Home";
	},

	create: function() {
	},

	credit: function() {
		if (!this.creditsView) {
			this.creditsView = new app.CreditsView();
		};
		$('#content').html(this.creditsView.render().el);
		
		document.title = this.title() + " - Credits";
	},

	showPuzzle: function() {
	},

	showAnswer: function() {
	},

	title: function() {
		return "Picross"
	}
});

var router = new app.AppRouter();
Backbone.history.start();