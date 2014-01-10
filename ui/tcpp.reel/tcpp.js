/**
 * @module ui/tcpp.reel
 * @requires oprime-montage/ui/experiment
 */
var Experiment = require("oprime-montage/ui/experiment.reel").Experiment;

/**
 * @class TCPP
 * @extends Experiment
 */
var TCPP = exports.TCPP = Experiment.specialize(/** @lends TCPP# */ {
    constructor: {
        value: function TCPP() {
            this.experimentalDesignSrc = "assets/stimuli/tcpp_design.json";
            this.super();
            this.loadDesign();
        }
    }
    // templateModuleId: {
    //     value: "oprime-montage/ui/experiment.reel/experiment.html"
    // }
});

exports.Tcpp = TCPP;
