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
        value: function(stimulus) {

            stimulus.visualChoiceA = this.application.experiment.experimentalDesign.visualChoiceA;
            stimulus.visualChoiceB = this.application.experiment.experimentalDesign.visualChoiceB;

            stimulus.audioFile = stimulus.audioVideo._collection[0].URL;
            this.super(stimulus);
            this.playAudio(1000);

        }
    }
});
exports.SailsStimulus = SailsStimulus;
