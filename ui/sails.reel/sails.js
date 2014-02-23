/**
 * @module ui/sails.reel
 * @requires oprime-montage/ui/experiment
 */
var Experiment = require("oprime-montage/ui/experiment.reel").Experiment,
    designToForceIncludeInMop = require("assets/stimuli/sails_design.json");
// sampleResultToForceIncludeInMop = require("assets/stimuli/sails_sample_result.json");

var enLocales = require("assets/stimuli/locale/en/messages.json");
var frLocales = require("assets/stimuli/locale/fr/messages.json");
var iuLocales = require("assets/stimuli/locale/iu/messages.json");


/**
 * @class SAILS
 * @extends Experiment
 */
var SAILS = exports.SAILS = Experiment.specialize( /** @lends SAILS# */ {
    constructor: {
        value: function SAILS() {
            // console.log(designToForceIncludeInMop);
            this.experimentalDesignSrc = "assets/stimuli/sails_design.json";
            this.super();
            this.loadDesign(designToForceIncludeInMop);

            this.contextualizer.addMessagesToContextualizedStrings(enLocales, "en");
            this.contextualizer.addMessagesToContextualizedStrings(frLocales, "fr");
            this.contextualizer.addMessagesToContextualizedStrings(iuLocales, "iu");

            this.application.currentStimuliDialect = {
                "iso": "fr",
                "name": "French",
                "nativeName": "français"
            };
            this.contextualizer.currentLocale = this.application.currentStimuliDialect.iso;
        }
    },

    experimentType: {
        value: "sails"
    },

    handleStartExperimentPress: {
        value: function() {
            console.log("start button action ");
        }
    },

    transform: {
        value: function() {


        }
    }
});

exports.Sails = SAILS;
