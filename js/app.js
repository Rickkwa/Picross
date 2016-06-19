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
		this.activeView = null;
	},

	home: function() {
		this.setView(app.HomeView);
		document.title = this.title("Home");
		this.setActiveNav("nav-home");
	},

	create: function() {
		this.loadSizes();
		this.setView(app.CreateView, { collection: this.sizes });
		document.title = this.title("Create");
		this.setActiveNav("nav-create");
	},

	credit: function() {
		this.setView(app.CreditsView);
		document.title = this.title("Credits");
		this.setActiveNav("nav-credits");
	},

	showPuzzle: function(encode) {
		var gridModel = new app.Grid();
		try {
			gridModel.decode(encode);
		} catch(err) {
			gridModel.destroy();
			gridModel = null;
		}

		this.setView(app.PuzzleView, { model: gridModel });
		document.title = this.title("Play");
		this.setActiveNav();
	},

	showAnswer: function(encode) {
		// Create puzzle view with custom option that tells it to show answer?
	},

	// Below are Helper functions

	setView: function(viewClass, otherArgs={}) {
		var $container = $("#content");
		var $innerContainer = $("<span></span>").addClass("inner-wrapper");
		$container.append($innerContainer);

		app.utils.destroyView(this.activeView);

		var args = { el: $innerContainer.get(0) };
		$.extend(args, otherArgs);
		this.activeView = new viewClass(args);
		this.activeView.render();
	},

	title: function(slug="") {
		return "Picross" + ((slug != "") ? " - " + slug : "");
	},

	setActiveNav: function(id=null) {
		$("nav li a").removeClass("active");
		if (id)
			$(`nav li a#${id}`).addClass("active");
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

app.router = new app.AppRouter();
Backbone.history.start();