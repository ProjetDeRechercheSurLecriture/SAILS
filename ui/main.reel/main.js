/**
 * @module ui/main.reel
 * @requires core/contextualizable-component
 */
var ContextualizableComponent = require("oprime-montage/core/contextualizable-component").ContextualizableComponent,
	Contextualizer = require("oprime-montage/core/contextualizer").Contextualizer;

/**
 * @class Main
 * @extends ContextualizableComponent
 */
exports.Main = ContextualizableComponent.specialize( /** @lends Main# */ {
	constructor: {
		value: function Main() {
			// localStorage.setItem("montage_locale", "fr");
			this.super();
			var globalContextualizer = new Contextualizer();
			console.log(globalContextualizer);
		}
	},

	// enterDocument: {
	// 	value: function(firstTime) {
	// 		this.super(firstTime);

	// 		if (firstTime) {
	// 			this.templateObjects.localesController.content = this.locales;
	// 		}
	// 	}
	// },

	locales: {
		value: [{
			"iso": "en",
			"label": "English",
		}, {
			"iso": "fr",
			"label": "Français",
		}, {
			"iso": "iu",
			"label": "ᐃᓄᒃᑎᑐᑦ",
		}]
	}

});
