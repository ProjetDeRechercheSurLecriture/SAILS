/**
 * @module ui/sails.reel
 * @requires oprime-montage/ui/experiment
 */
var Experiment = require("oprime-montage/ui/experiment.reel").Experiment,
    designToForceIncludeInMop = require("assets/stimuli/sails_design.json");
// sampleResultToForceIncludeInMop = requi re("assets/stimuli/sails_sample_result.json");

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

            for (var subexperimentIndex = 0; subexperimentIndex < x.subexperiments.length; subexperimentIndex++) {
                var subexperiment = x.subexperiments[subexperimentIndex];
                subexperiment.scoreSubTotal = 0;
                for (var stimulusIndex = 0; stimulusIndex < subexperiment.trials.length; stimulusIndex++) {
                    var stimulus = subexperiment.trials[stimulusIndex];
                    console.log(stimulus);

                    stimulus.prime = {
                        carrierPhrase: "",
                        imageFile: "",
                        carrierAudio: ""
                    };

                    stimulus.target = {
                        carrierPhrase: "",
                        imageFile: "gris.png",
                        carrierAudio: ""
                    };
                    stimulus.prime.phonemic = stimulus.auditoryStimulus;
                    stimulus.prime.audio = stimulus.auditoryStimulus;
                    stimulus.prime.orthographic = stimulus.auditoryStimulus;
                    delete stimulus.auditoryStimulus;
                    delete stimulus.transcription;

                    stimulus.prime.audioFile = stimulus.audioFile;
                    delete stimulus.audioFile;

                    if (stimulus.response === "gris") {
                        stimulus.target.phonemic = "gʁi";
                        stimulus.target.orthographic = "gris";
                        stimulus.prime.orthographic = "gris";
                    } else {
                        stimulus.target.phonemic = "*";
                        stimulus.target.orthographic = "X";
                    }
                    delete stimulus.targetImage;
                    delete stimulus.distractorImages;
                    delete stimulus.response;

                }
            }

            // x.subexperiments[0].trials[0]
            // x.subexperiments[1].trials[6]
        }
    }
});

exports.Sails = SAILS;
