/**
 * @module ui/main.reel
 * @requires core/contextualizable-component
 */
var ContextualizableComponent = require("oprime-montage/core/contextualizable-component").ContextualizableComponent;

var enLocales = require("locales/en/messages.json");
var frLocales = require("locales/fr/messages.json");

/**
 * @class Main
 * @extends ContextualizableComponent
 */
exports.Main = ContextualizableComponent.specialize( /** @lends Main# */ {
	constructor: {
		value: function Main() {
			// localStorage.setItem("montage_locale", "fr");
			this.super();

			this.contextualizer.addMessagesToContextualizedStrings(enLocales, "en");
			this.contextualizer.addMessagesToContextualizedStrings(frLocales, "fr");
			// console.log(this.contextualizer);
		}
	},

	// enterDocument: {
	//	value: function(firstTime) {
	//		this.super(firstTime);

	//		if (firstTime) {
	//			this.templateObjects.localesController.content = this.locales;
	//		}
	//	}
	// },

	handleLocalesAction: {
		value: function(e) {
			console.log("handleLocalesAction", e);
			this.contextualizer.currentLocale = e.target.value.iso;
			this.needsDraw = true;
		}
	},

	locales: {
		value: [{
			"iso": "en",
			"label": "English",
		}, {
			"iso": "fr",
			"label": "Français",
		}]
	}

});
