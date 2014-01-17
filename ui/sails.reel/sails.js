/**
 * @module ui/sails.reel
 * @requires oprime-montage/ui/experiment
 */
var Experiment = require("oprime-montage/ui/experiment.reel").Experiment;

/**
 * @class SAILS
 * @extends Experiment
 */
var SAILS = exports.SAILS = Experiment.specialize(/** @lends SAILS# */ {
    constructor: {
        value: function SAILS() {
            this.experimentalDesignSrc = "assets/stimuli/sails_design.json";
            this.super();
            this.loadDesign();
        }
    }
    // templateModuleId: {
    //     value: "oprime-montage/ui/experiment.reel/experiment.html"
    // }
});

exports.Sails = SAILS;
