/**
 * @module ui/sails.reel
 * @requires oprime-montage/ui/experiment
 */
var Experiment = require("oprime-montage/ui/experiment.reel").Experiment,
    designToForceIncludeInMop = require("assets/stimuli/sails_design.json");

/**
 * @class SAILS
 * @extends Experiment
 */
var SAILS = exports.SAILS = Experiment.specialize(/** @lends SAILS# */ {
    constructor: {
        value: function SAILS() {
            console.log(designToForceIncludeInMop);
            this.experimentalDesignSrc = "assets/stimuli/sails_design.json";
            this.super();
            this.loadDesign(designToForceIncludeInMop);
        }
    }
    // templateModuleId: {
    //     value: "oprime-montage/ui/experiment.reel/experiment.html"
    // }
});

exports.Sails = SAILS;
