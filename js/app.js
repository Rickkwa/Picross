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
		if (!this.homeView)
			this.homeView = new app.HomeView({ el: "#content" });
		this.homeView.render();
		document.title = this.title() + " - Home";
	},

	create: function() {
		this.loadSizes();
		if (!this.createView)
			this.createView = new app.CreateView({ el: "#content", collection: this.sizes });
		this.createView.render();
		document.title = this.title() + " - Create";
	},

	credit: function() {
		if (!this.creditsView)
			this.creditsView = new app.CreditsView({ el: "#content" });
		this.creditsView.render();
		document.title = this.title() + " - Credits";
	},

	showPuzzle: function(encode) {
	},

	showAnswer: function(encode) {
	},

	// Below are Helper functions

	title: function() {
		return "Picross";
	},

	loadSizes: function() {
		var sizeList = [
			new app.PuzzleSize({ rows: 5, cols: 5}),
			new app.PuzzleSize({ rows: 10, cols: 10}),
			new app.PuzzleSize({ rows: 15, cols: 15, defaultSelected: true}),
			new app.PuzzleSize({ rows: 20, cols: 20}),
			new app.PuzzleSize({ rows: 25, cols: 25}),
		];
		if (!this.sizes)
			this.sizes = new app.PuzzleSizes(sizeList);
	}
});

var router = new app.AppRouter();
Backbone.history.start();