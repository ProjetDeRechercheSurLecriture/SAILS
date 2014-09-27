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
            if (model && model.audioVideo && model.audioVideo._collection && model.audioVideo._collection[0] && model.audioVideo._collection[0].URL) {
                model.audioFile = model.audioVideo._collection[0].URL;
            } else {
                if (model && model._audioVideo && model._audioVideo._collection && model._audioVideo._collection[0] && model._audioVideo._collection[0].URL) {
                    model.audioFile = model._audioVideo._collection[0].URL;
                } else {
                    console.warn("MINIFICATION IS BREAKING THE IMAGES OBJECTS ALSO");
                    model.audioFile = "gammatone.wav";
                }
            }

            model.layout = {
                randomize: false,
                visualChoiceA: model.visualChoiceA,
                visualChoiceB: model.visualChoiceB
            };
            model.target = model.target || {};
            if (model && model.datumFields && model.datumFields.orthography && model.datumFields.orthography.value) {
                model.target.orthography = model.datumFields.orthography.value;
            } else {
                console.warn("THIS DATUM HAS NO ORTHOGRAPHY MINIFYING IS BREAKING THE FIELDB OBJECTS!!!?", model.datumFields, model._datumFields);
                if (model && model._datumFields && model._datumFields.orthography && model._datumFields.orthography._value) {
                    console.warn("USING _ FIELDS ", model._datumFields.orthography, model._datumFields.orthography._value);
                    model.target.orthography = model._datumFields.orthography._value;
                } else {
                    model.target.orthography = "";
                }
            }
            if (model && model.datumFields && model.datumFields.utterance && model.datumFields.utterance.value) {
                model.target.utterance = model.datumFields.utterance.value;
            } else {
                console.warn("THIS DATUM HAS NO UTTERANCE MINIFYING IS BREAKING THE FIELDB OBJECTS!!!?", model.datumFields, model._datumFields);
                if (model && model._datumFields && model._datumFields.utterance && model._datumFields.utterance._value) {
                    console.warn("USING _ FIELDS ", model._datumFields.utterance, model._datumFields.utterance._value);
                    model.target.utterance = model._datumFields.utterance._value;
                } else {
                    model.target.utterance = "";
                }
            }
            // model.target.imageFile = model.images._collection[0].URL;
            if (model && model.images && model.images._collection && model.images._collection[0] && model.images._collection[0].URL) {
                model.target.imageFile = model.images._collection[0].URL;
            } else {
                if (model && model._images && model._images._collection && model._images._collection[0] && model._images._collection[0].URL) {
                    model.target.imageFile = model._images._collection[0].URL;
                } else {
                    console.warn("MINIFICATION IS BREAKING THE IMAGES OBJECTS ALSO");
                    model.target.imageFile = "placeholder.png";
                }
            }

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

            if (model.target.imageFile.substring(model.target.imageFile.lastIndexOf("/") + 1) === model.visualChoiceA.substring(model.visualChoiceA.lastIndexOf("/") + 1)) {
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
