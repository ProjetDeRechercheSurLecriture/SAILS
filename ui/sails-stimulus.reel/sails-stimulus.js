/**
 * @module ui/sails-stimulus.reel
 * @requires core/contextualizable-component
 */
var AbstractStimulus = require("oprime-montage/core/abstract-stimulus").AbstractStimulus;

/**
 * @class SailsStimulus
 * @extends AbstractStimulus
 */
exports.SailsStimulus = AbstractStimulus.specialize( /** @lends SailsStimulus# */ {
    constructor: {
        value: function SailsStimulus() {
            this.super();
            this.confirmResponseChoiceMessage = "locale_confirm_choice";
        }
    },
    load: {
        value: function(stimulus) {

            stimulus.visualChoiceA = this.application.experiment.experimentalDesign.visualChoiceA;
            stimulus.visualChoiceB = this.application.experiment.experimentalDesign.visualChoiceB;

            stimulus.audioFile = stimulus.audioVideo._collection[0].URL;
            this.super(stimulus);
            this.playAudio(1000);

        }
    }
});
