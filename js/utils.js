var app = app || {};

app.utils = {
	leftPad: function(str, pad, targetLength) {
		// Pad the string str with character pad until the string is of length targetLength
		var diff = targetLength - str.length;
		if (diff <= 0)
			return str;
		return new Array(diff + 1).join(pad) + str; // http://stackoverflow.com/a/14343876/2079781
	},

	arrLeftPad: function(arr, pad, targetLength) {
		var diff = targetLength - arr.length;
		if (diff <= 0)
			return arr;
		return new Array(diff + 1).join(pad).split("").concat(arr);
	},

	dec2bin: function(dec) {
		// From http://stackoverflow.com/a/16155417/2079781
		return (dec >>> 0).toString(2);
	},

	transpose: function(arr) {
		// From http://stackoverflow.com/a/17428779/2079781
		return _.zip.apply(_, arr);
	},

	setTile: function(gridModel, $tile, state) {
		if (gridModel) {
			// Fill/Unfill the tile based on state
			if (state == 1)
				$tile.addClass("fill");
			else
				$tile.removeClass("fill");

			// Set the grid model to reflect
			let {row, col} = $tile.data("coords");
			gridModel.setState(row, col, state);
		}
	},

	destroyView: function(view) {
		if (view) {
			// http://stackoverflow.com/a/11534056/2079781
			view.undelegateEvents();
			view.$el.removeData().unbind();
			view.remove();
			Backbone.View.prototype.remove.call(view);
		}
	}
};