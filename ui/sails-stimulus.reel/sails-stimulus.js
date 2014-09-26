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
        value: function(model) {

            model.visualChoiceA = this.application.experiment.experimentalDesign.visualChoiceA;
            model.visualChoiceB = this.application.experiment.experimentalDesign.visualChoiceB;
            model.audioFile = model.audioVideo._collection[0].URL;

            model.layout = {
                randomize: false,
                visualChoiceA: model.visualChoiceA,
                visualChoiceB: model.visualChoiceB
            };
            model.target = model.target || {};
            model.target.orthography = model.datumFields.orthography.value;
            model.target.utterance = model.datumFields.utterance.value;
            model.target.imageFile = model.images._collection[0].URL;
            model.target.audioFile = model.audioFile;

            model.prime = model.prime || {};
            model.prime.audioFile = model.audioFile;
            model.prime.imageFile = "";
            model.prime.orthography = model.target.orthography;
            model.prime.utterance = model.target.utterance;

            if (model.target.utterance === "gʁi") {
                model.distractors = [{
                    imageFile: "pas_gris.png",
                    utterance: "pas gʁi",
                    orthography: "pas gris",
                    audioFile: ""
                }];
            } else {
                model.distractors = [{
                    imageFile: "gris.png",
                    utterance: "gʁi",
                    orthography: "gris",
                    audioFile: ""
                }];
            }
            this.super(model);
            this.playAudio(1000);

        }
    }
});
