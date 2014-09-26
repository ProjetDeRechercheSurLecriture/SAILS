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

            if (model.target.imageFile.substring(model.target.imageFile.lastIndexOf("/") + 1) === model.visualChoiceA.substring(model.visualChoiceA.lastIndexOf("/") + 1) ) {
                console.info("===== The target of this stimulus " + model.target.utterance + " is positioned in visualChoiceA");

                model.target.visualChoice = "visualChoiceA";
                model.distractors[0].visualChoice = "visualChoiceB";
            } else {
                console.info("===== The target of this stimulus " + model.target.utterance + " is positioned in visualChoiceB");

                model.target.visualChoice = "visualChoiceB";
                model.distractors[0].visualChoice = "visualChoiceA";
            }

            this.super(model);
            this.playAudio(1000);

        }
    }
});
