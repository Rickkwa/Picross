var app = app || {};

app.utils = {
	leftPad: function(str, pad, targetLength) {
		// Pad the string str with character pad until the string is of length targetLength
		var result = str;
		var diff = targetLength - str.length;

		while (diff > 0) {
			if (diff % 2 == 1)
				result = pad + result;
			pad = pad + pad;
			diff = Math.floor(diff / 2);
		}
		return result;
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