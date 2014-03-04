/**
 * @module ui/main.reel
 * @requires core/contextualizable-component
 */
var ContextualizableComponent = require("oprime-montage/core/contextualizable-component").ContextualizableComponent;

var enLocales = require("oprime-montage/locale/en/messages.json");
var frLocales = require("oprime-montage/locale/fr/messages.json");

var enExperimentLocalizations = require("assets/stimuli/locale/en/messages.json");
var frExperimentLocalizations = require("assets/stimuli/locale/fr/messages.json");

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
			this.contextualizer.addMessagesToContextualizedStrings(enExperimentLocalizations, "en");
			this.contextualizer.addMessagesToContextualizedStrings(frExperimentLocalizations, "fr");
			this.application.interfaceLocale = {
			    "iso": "fr",
			    "name": "French",
			    "nativeName": "français"
			};
			this.contextualizer.currentLocale = this.application.interfaceLocale.iso;
			this.application.contextualizer = this.contextualizer;
			// console.log(this.contextualizer);
		}
	}
});
