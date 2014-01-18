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
    }
  },
  load: {
    value: function(stimulus) {

      var imagePath = this.imageAssetsPath || "missingpath";
      imagePath += "/";
      var audioPath = this.audioAssetsPath || "missingpath";
      audioPath += "/";

      stimulus.audioFile = audioPath + stimulus.audioFile;

      this.super(stimulus);
    }
  }
});
