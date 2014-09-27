/**
 * @module ui/sails.reel
 * @requires oprime-montage/ui/experiment
 */
var Experiment = require("oprime-montage/ui/experiment.reel").Experiment;


/**
 * @class SAILS
 * @extends Experiment
 */
var SAILS = exports.SAILS = Experiment.specialize( /** @lends SAILS# */ {
    constructor: {
        value: function SAILS() {
            this.experimentalDesignSrc = "gris";
            this.super();

            this.stimuliDBname = "sails-fr-ca";
            this.loadDesign();
            this.recordUsingMicrophoneOnly = true;

            this.canReplayStimuli = true;
            this.canPauseStimuli = true;

            this.application.currentStimuliDialect = {
                "iso": "fr",
                "name": "French",
                "nativeName": "français"
            };
            this.contextualizer.currentLocale = this.application.currentStimuliDialect;
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
                        imageFile: "placeholder.jpg",
                        carrierAudio: ""
                    };
                    stimulus.prime.utterance = stimulus.auditoryStimulus;
                    stimulus.prime.audio = stimulus.auditoryStimulus;
                    stimulus.prime.orthography = stimulus.auditoryStimulus;
                    delete stimulus.auditoryStimulus;
                    delete stimulus.transcription;

                    stimulus.prime.audioFile = stimulus.audioFile;
                    delete stimulus.audioFile;

                    if (stimulus.response === "rxx") {
                        stimulus.target.utterance = "ʁχχ";
                        stimulus.target.orthography = "rxx";
                        stimulus.prime.orthography = "rxx";
                    } else {
                        stimulus.target.utterance = "*";
                        stimulus.target.orthography = "X";
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
