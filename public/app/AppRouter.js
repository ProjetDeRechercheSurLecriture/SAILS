define([ 
    "backbone",
    "datum/Session",
    "datum/SessionEditView",
    "libs/Utils"
], function(
    Backbone,
    Session,
    SessionEditView
) {
  var AppRouter = Backbone.Router.extend(
  /** @lends AppRouter.prototype */
  {
    /**
     * @class Routes URLs to different dashboard layouts and data.As backbone is
     *        a one page app, this shows and hides different "pages", for
     *        example it starts out with a full screen dashboard view, with
     *        datalist and a datum, but when the user clicks the full screen
     *        buttons or uses the navigation menu, and it also happens any time
     *        the URL changes it will make the component full screen by hiding
     *        and showing divs using jquery.
     * 
     * @extends Backbone.Router
     * @constructs
     */
    initialize : function() {
    },

    routes : {
      "corpus/:corpusId"                : "showFullscreenCorpus", 
      "corpus/:corpusName/datum/:id"    : "showEmbeddedDatum", //corpusName has to match the pouch of the datum
      "corpus/:corpusName/search"       : "showAdvancedSearch",//corpusName has to match the pouch of the corpus
      "corpus/"                         : "showFullscreenCorpus", 
      "data/:dataListId"                : "showFullscreenDataList",
      "user/:username"                  : "showFullscreenUser",
      "import"                          : "showImport",
      ""                                : "showDashboard"
    },
    
    /**
     * Displays the dashboard view of the given corpusName, if one was given. Or
     * the blank dashboard view, otherwise.
     * 
     * @param {String}
     *          corpusName (Optional) The name of the corpus to display.
     */
    showDashboard : function(corpusName) {
      Utils.debug("In showDashboard: " + corpusName);

      this.hideEverything();
      $("#dashboard-view").show();
      $("#datums-embedded").show();
      
    },
    /**
     * Displays the fullscreen user page view of the given user
     */
    showFullscreenUser : function(userName) {
      Utils.debug("In showFullscreenUser: " + userName);

      this.hideEverything();
      $("#user-fullscreen").show();
    },

    /**
     * Displays all of the corpus details and settings. 
     * 
     * @param {String}
     *          corpusName The name of the corpus this datum is from.
     */
    showFullscreenCorpus : function(corpusName ) {
      Utils.debug("In showFullscreenCorpus: " + corpusName);

      this.hideEverything();
      $("#corpus-fullscreen").show();
    },
    /**
     * Displays all of the corpus details and settings. 
     * 
     * @param {String}
     *          corpusName The name of the corpus this datum is from.
     */
    showEmbeddedCorpus : function(corpusName ) {
      Utils.debug("In showEmbeddedCorpus: " + corpusName);

      this.hideEverything();
      $("#dashboard-view").show();
      $("#corpus-embedded").show();
    },
    
    /**
     * Displays the fullscreen view of the session specified by the given
     * corpusName and the given datumId.
     * 
     * @param {String}
     *          corpusName The name of the corpus this datum is from, this needs to direclty match its pouch.
     * @param {Number}
     *          sessionId The ID of the session within the corpus.
     */
    showEmbeddedSession : function(corpusName, sessionId) {
      Utils.debug("In showEmbeddedSession: " + corpusName + " *** "
          + sessionId);
          
      //If called with no sessionId, don't change the model, simply show the div TODO is this really the convention we want?
      if(sessionId == null){
        this.hideEverything();
        $("#dashboard-view").show();
        $("#session-embedded").show();
        return;
      }
      if(sessionId == undefined || corpusName == undefined){
        return;
      }
      // Change the id of the session view's Session to be the given sessionId
      appView.sessionEditView.model.set({
        "id" : sessionId,
        "corpusname": corpusName});
      var self = this;
      //change to the right pouch first
      appView.sessionEditView.model.changeCorpus(corpusName, function(){
        // Fetch the Session's attributes from the PouchDB
        appView.sessionEditView.model.fetch({
          success : function() {
            // Update the display with the Session with the given sessionId
            appView.sessionEditView.render();
            
            // Display the edit session view and hide all the other views
            self.hideEverything();
            $("#dashboard-view").show();
            $("#session-embedded").show();
          },
          
          error : function() {
            Utils.debug("Session does not exist: " + sessionId);
            
            // Create a new Session (cloning the default session fields from the
            // corpus in case they changed) and render it
            appView.sessionEditView = new SessionEditView({
              model : new Session({
                sessionFields : app.get("corpus").get("sessionFields").clone()
              })
            });
            appView.sessionEditView.render();
            
            // Display the edit session view and hide all the other views
            self.hideEverything();
            $("#dashboard-view").show();
            $("#session-embedded").show();
          }
        });
      });
    },
   
    /**
     * Displays the fullscreen view of the datalist specified by the given
     * corpusName and the given dataListId
     * 
     * @param {String}
     *          corpusName The name of the corpus this datalist is from.
     * @param {Number}
     *          dataListId The ID of the datalist within the corpus.
     */
    showFullscreenDataList : function(corpusName, dataListId) {
      Utils.debug("In showFullscreenDataList: " + corpusName + " *** "
          + dataListId);

      this.hideEverything();
      $("#data-list-fullscreen").show();      
    },
    
    /**
     * Display the fullscreen view of search within the corpus specified by the
     * given corpusName.
     * 
     * @param {String}
     *          corpusName The name of the corpus to search in.
     */
    showAdvancedSearch : function(corpusName) {
      Utils.debug("In showAdvancedSearch: " + corpusName);

      this.hideEverything();
      $("#search-fullscreen").show();
    },

    showImport : function() {
      Utils.debug("In import: ");

      this.hideEverything();
      $("#dashboard-view").show();
      $('#import-modal').modal("show");
    },
    
    showExport : function(corpusName) {
      Utils.debug("In showExport: " + corpusName);

      this.hideEverything();
      $("#dashboard-view").show();
      $('#export-modal').modal("show");
    },
    
    //Functions that toggle between editable and readonly corpus views
    showEditableCorpus : function(corpusid){
      window.appView.renderEditableCorpusViews(corpusid);
    },
    showReadonlyCorpus : function(corpusid){
      window.appView.renderReadonlyCorpusViews(corpusid);
    },
    
    //Functions that toggle between editable and readonly session views
    showEditableSession : function(sessionid){
      window.appView.renderEditableSessionViews(sessionid);
    },
    showReadonlySession : function(sessionid){
      window.appView.renderReadonlySessionViews(sessionid);
    },
    
    //Functions that toggle between editable and readonly session views
    showEditableDataList : function(datalistid){
      window.appView.renderEditableDataListViews(datalistid);
    },
    showReadonlyDataList : function(datalistid){
      window.appView.renderReadonlyDataListViews(datalistid);
    },
    
    // Functions that toggle between editable and readonly datums view
    showEditableDatums : function(format) {
      window.appView.renderEditableDatumsViews(format);
      this.hideEverything();
      if (format == "centreWell") {
        this.showDashboard();
      } else if (format == "fullscreen") {
        $("#datum-container-fullscreen").show();
      }
    },
    showReadonlyDatums : function(format) {
      window.appView.renderReadonlyDatumsViews(format);
      this.hideEverything();
      if (format == "centreWell") {
        this.showDashboard();
      } else if (format == "fullscreen") {
        $("#datum-container-fullscreen").show();
      }
    },
    
    hideEverything: function() {
      $("#dashboard-view").hide();
      $("#datums-embedded").hide();
      $("#data-list-fullscreen").hide();
      $("#datum-container-fullscreen").hide();
      $("#corpus-embedded").hide();
      $("#corpus-fullscreen").hide();
      $("#search-fullscreen").hide();
      $("#search-embedded").hide();
      $("#session-embedded").hide();
      $('#user-fullscreen').hide();
    }
  });

  return AppRouter;
});
