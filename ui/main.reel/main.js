/**
 * @module ui/main.reel
 * @requires core/contextualizable-component
 */
var ContextualizableComponent = require("oprime-montage/core/contextualizable-component").ContextualizableComponent;

var enLocales = require("oprime-montage/locale/en/messages.json");
var frLocales = require("oprime-montage/locale/fr/messages.json");

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
	}

});
