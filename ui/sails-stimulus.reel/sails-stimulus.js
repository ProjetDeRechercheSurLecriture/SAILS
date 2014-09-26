/**
 * @module ui/sails-stimulus.reel
 * @requires core/contextualizable-component
 */
var AbstractStimulus = require("oprime-montage/core/abstract-stimulus").AbstractStimulus;

/**
 * @class SailsStimulus
 * @extends AbstractStimulus
 */
var SailsStimulus = function SailsStimulus(options) {
    this.debug("Constructing SailsStimulus ", options);
    AbstractStimulus.apply(this, arguments);
    this.confirmResponseChoiceMessage = "locale_confirm_choice";
};

SailsStimulus.prototype = Object.create(AbstractStimulus.prototype, /** @lends SailsStimulus.prototype */ {
    constructor: {
        value: SailsStimulus
    },

    load: {
        value: function(stimulusDetails) {

            this.visualChoiceA = this.application.experiment.experimentalDesign.visualChoiceA;
            this.visualChoiceB = this.application.experiment.experimentalDesign.visualChoiceB;
            this.audioFile = stimulusDetails.audioVideo._collection[0].URL;

            this.layout = {
                randomize: false,
                visualChoiceA: this.visualChoiceA,
                visualChoiceB: this.visualChoiceB
            };
            this.target = this.target || {};
            this.target.orthography = stimulusDetails.datumFields.orthography.value;
            this.target.utterance = stimulusDetails.datumFields.utterance.value;
            this.target.imageFile = stimulusDetails.images._collection[0].URL;
            this.target.audioFile = this.audioFile;

            this.prime = this.prime || {};
            this.prime.audioFile = this.audioFile;
            this.prime.imageFile = "";
            this.prime.orthography = this.target.orthography;
            this.prime.utterance = this.target.utterance;

            if (this.target.utterance === "gʁi") {
                this.distractors = [{
                    imageFile: "pas_gris.png",
                    utterance: "pas gʁi",
                    orthography: "pas gris",
                    audioFile: ""
                }];
            } else {
                this.distractors = [{
                    imageFile: "gris.png",
                    utterance: "gʁi",
                    orthography: "gris",
                    audioFile: ""
                }];
            }
            AbstractStimulus.prototype.load.apply(this, []);
            this.playAudio(1000);

        }
    }
});
exports.SailsStimulus = AbstractStimulus;
