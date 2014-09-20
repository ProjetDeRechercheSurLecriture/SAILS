/**
 * @module ui/main.reel
 * @requires core/contextualizable-component
 */
var OPrimeMain = require("oprime-montage/ui/main.reel").Main;

// var enLocales = require("oprime-montage/locale/en/messages.json");
// var frLocales = require("oprime-montage/locale/fr/messages.json");
/**
 * @class Main
 * @extends OPrimeMain
 */
exports.Main = OPrimeMain.specialize( /** @lends Main# */ {
	constructor: {
		value: function Main() {
			// localStorage.setItem("montage_locale", "fr");
			this.super();

			// this.contextualizer.addMessagesToContextualizedStrings(enLocales, "en");
			// this.contextualizer.addMessagesToContextualizedStrings(frLocales, "fr");
			// this.contextualizer.addMessagesToContextualizedStrings(enExperimentLocalizations, "en");
			// this.contextualizer.addMessagesToContextualizedStrings(frExperimentLocalizations, "fr");
			this.application.interfaceLocale = {
			    "iso": "fr",
			    "name": "French",
			    "nativeName": "français"
			};
			this.contextualizer.currentLocale = this.application.interfaceLocale;
			// this.application.contextualizer = this.contextualizer;
			// console.log(this.contextualizer);
		}
	}
});
