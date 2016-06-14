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
	}
};