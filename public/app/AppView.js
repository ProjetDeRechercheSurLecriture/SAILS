define([ 
    "use!backbone", 
    "use!handlebars",
    "app/App", 
    "text!app/app.handlebars", 
    "app/AppRouter",
    "activity/ActivityFeed",
    "activity/ActivityFeedView",
    "authentication/Authentication",
    "authentication/AuthenticationEditView",
    "corpus/Corpus", 
    "corpus/CorpusEditView",
    "corpus/CorpusReadView",
    "data_list/DataList",
    "data_list/DataListReadView",
    "data_list/DataListEditView",
    "datum/Datum",
    "datum/DatumContainerEditView",
    "datum/DatumFields", 
    "export/Export",
    "export/ExportReadView",
    "hotkey/HotKey",
    "hotkey/HotKeyEditView",
    "import/Import",
    "import/ImportEditView",
    "user/UserPreference",
    "user/UserPreferenceEditView",
    "search/Search",
    "search/SearchEditView",
    "datum/Session",
    "datum/SessionEditView",
    "datum/SessionReadView",
    "user/User",
    "user/UserEditView",
    "user/UserReadView",
    "libs/Utils"
], function(
    Backbone, 
    Handlebars,
    App, 
    appTemplate,
    AppRouter, 
    ActivityFeed,
    ActivityFeedView,
    Authentication,
    AuthenticationEditView,
    Corpus, 
    CorpusEditView,
    CorpusReadView,
    DataList,
    DataListReadView,
    DataListEditView,
    Datum,
    DatumContainerEditView,
    DatumFields,
    Export,
    ExportReadView,
    HotKey,
    HotKeyEditView,
    Import,
    ImportEditView,
    UserPreference,
    UserPreferenceEditView,
    Search,
    SearchEditView,
    Session,
    SessionEditView,
    SessionReadView,
    User,
    UserEditView,
    UserReadView
) {
  var AppView = Backbone.View.extend(
  /** @lends AppView.prototype */
  {
    /**
     * @class The main layout of the program controls and loads the app. It
     *        allows the user to configure the dashboard by loading their
     *        handlebars. It contains the views of all the core models
     *        referenced in the app model and it will have partial handlebar of
     *        the navigation menu.
     * 
     * @description Starts the application and initializes all its children.
     * 
     * @extends Backbone.View
     * @constructs
     */
    initialize : function() {
      Utils.debug("APP init: " + this.el);

//      var userToBePassedAround = new User();
     
      
      // Create five corpus views
      this.corpusEditLeftSideView = new CorpusEditView({
        model : this.model.get("corpus")
      });
      this.corpusEditLeftSideView.format = "leftSide";
      
      this.corpusReadLeftSideView = new CorpusReadView({
        model : this.model.get("corpus")
      });
      this.corpusReadLeftSideView.format = "leftSide";

      this.corpusEditEmbeddedView = new CorpusEditView({
        model : this.model.get("corpus")
      });
      this.corpusEditEmbeddedView.format = "centreWell";
      
      this.corpusReadEmbeddedView = new CorpusReadView({
        model : this.model.get("corpus")
      });
      this.corpusReadEmbeddedView.format = "centreWell";
      
      this.corpusEditFullscreenView = new CorpusEditView({
        model : this.model.get("corpus")
      });
      this.corpusEditFullscreenView.format = "fullscreen";
      
      this.corpusReadFullscreenView = new CorpusReadView({
        model : this.model.get("corpus")
      });
      this.corpusReadFullscreenView.format = "fullscreen";
      
      /*
       * Set up four session views
       */ 
      this.sessionEditLeftSideView = new SessionEditView({
        model : this.model.get("currentSession")
      });
      this.sessionEditLeftSideView.format = "leftSide";
      this.sessionReadLeftSideView = new SessionReadView({
        model : this.model.get("currentSession")
      });
      this.sessionReadLeftSideView.format = "leftSide";
      this.sessionEditEmbeddedView = new SessionEditView({
        model : this.model.get("currentSession")
      });
      this.sessionEditEmbeddedView.format = "embedded";
      this.sessionReadEmbeddedView = new SessionReadView({
        model : this.model.get("currentSession")
      });
      this.sessionReadEmbeddedView.format = "embedded";
      
      
      // Create an AuthenticationEditView
      this.authView = new AuthenticationEditView({
        model : this.model.get("authentication")
      });
      
      /* 
       * Set up the five user views
       */
      this.fullScreenEditUserView = new UserEditView({
        model : this.model.get("authentication").get("userPrivate")
      });
      this.fullScreenEditUserView.format = "fullscreen";
      
      this.fullScreenReadUserView = new UserReadView({
        model : this.model.get("authentication").get("userPrivate")
      });
      this.fullScreenReadUserView.format = "fullscreen";

      this.modalEditUserView = new UserEditView({
        model : this.model.get("authentication").get("userPrivate")
      });
      this.modalEditUserView.format = "modal";
      
      this.modalReadUserView = new UserReadView({
        model : this.model.get("authentication").get("userPrivate")
      });
      this.modalReadUserView.format = "modal";

      
      // Create the embedded and fullscreen DatumContainerEditView
      this.datumsView = new DatumContainerEditView();
      
      /*
       * Set up the four data list views
       */
      var dataListToBePassedAround = this.model.get("currentDataList") || new DataList();
      
      this.dataListEditLeftSideView = new DataListEditView({
        model : dataListToBePassedAround
      }); 
      this.dataListEditLeftSideView.format = "leftSide";
   
      this.dataListEditFullscreenView = new DataListEditView({
        model : this.dataListEditLeftSideView.model
      });  
      this.dataListEditFullscreenView.format = "fullscreen";

      this.dataListReadLeftSideView = new DataListReadView({
        model :  this.dataListEditLeftSideView.model
      });  
      this.dataListReadLeftSideView.format = "leftSide";
   
      this.dataListReadFullscreenView = new DataListReadView({
        model :  this.dataListEditLeftSideView.model
      });  
      this.dataListReadFullscreenView.format = "fullscreen";
      
      /*
       *  Create search views
       */
      this.searchView = new SearchEditView({
        model : new Search()
      });
      this.searchView.format = "top";
      
      this.advancedSearchView = new SearchEditView({
        model : new Search()
      });
      this.advancedSearchView.format = "fullscreen";
      
      // Create a UserPreferenceEditView
      this.userPreferenceView = new UserPreferenceEditView({
        model : this.authView.model.get("userPrivate").get("prefs")
      });
      
      // Create an ActivityFeedView
      this.activityFeedView = new ActivityFeedView({
        model : new ActivityFeed()
      }); 

      // Create a HotKeyEditView
      this.hotkeyEditView = new HotKeyEditView({
        model : this.authView.model.get("userPrivate").get("hotkeys")
      });   
      
      // Create an ExportREadView
      this.exportView = new ExportReadView({
        model : new Export()
      });

     
      
      // Create an ImportEditView
      this.importView = new ImportEditView({
        model : new Import()
      });

      // Create and initialize a Terminal
      this.term = new Terminal('terminal');
      this.term.initFS(false, 1024 * 1024);
      
      
      // Set up a timeout event every 10sec
      _.bindAll(this, "saveScreen");
      window.setInterval(this.saveScreen, 10000);     
    },
    
    /**
     * The underlying model of the AppView is an App.
     */
    model : App,

    /**
     * Events that the AppView is listening to and their handlers.
     */
    events : {
      "click .icon-refresh" : "replicateDatabases"
    },
    
    /**
     * The Handlebars template rendered as the AppView.
     */
    template : Handlebars.compile(appTemplate),
    
    /**
     * Renders the AppView and all of its child Views.
     */
    render : function() {
      Utils.debug("APP render: " + this.el);
      if (this.model != undefined) {
        // Display the AppView
        this.setElement($("#app_view"));
        $(this.el).html(this.template(this.model.toJSON()));
        
        // Display the Corpus Views
        this.corpusEditLeftSideView.render();
        this.corpusReadLeftSideView.render();
        this.corpusEditEmbeddedView.render();
        this.corpusReadEmbeddedView.render();
        this.corpusEditFullscreenView.render();
        this.corpusReadFullscreenView.render();
        
        // Display the ExportView
        this.exportView.render();
        
        // Display the User Views
        this.fullScreenEditUserView.render();
        this.fullScreenReadUserView.render();
        this.modalEditUserView.render();
        this.modalReadUserView.render();
        
        // Display the Datum Container Views
        this.datumsView.format = "centreWell";
        this.datumsView.render();
        
        // Display the Search Views
        this.searchView.render();
        this.advancedSearchView.render();
        
        // Display the AuthView
        this.authView.render();
        
        // Display the Session Views
        this.sessionEditLeftSideView.render();
        this.sessionReadLeftSideView.render();
        this.sessionEditEmbeddedView.render();
        this.sessionReadEmbeddedView.render();
        
        
        // Display the UserPreferenceEditView
        this.userPreferenceView.render();
        
        //Display ActivityFeedView
        this.activityFeedView.render();
        
        // Display HotKeysView
        this.hotkeyEditView.render();//.showModal();

        // Display Data List Views 
        this.dataListEditLeftSideView.render();
        this.dataListEditFullscreenView.render();
        this.dataListReadLeftSideView.render();
        this.dataListReadFullscreenView.render();
         
        // Display the ImportEditView
        this.importView.render();
        
        
      } else {
        Utils.debug("\tApp model is not defined");
      }
      
      return this;
    },
    // Display the Corpus Views
    renderEditableCorpusViews: function(corpusid){
      this.corpusEditLeftSideView.render();
      this.corpusEditEmbeddedView.render();
      this.corpusEditFullscreenView.render();
    },
    renderReadonlyCorpusViews: function(corpusid){
      this.corpusReadLeftSideView.render();
      this.corpusReadEmbeddedView.render();
      this.corpusReadFullscreenView.render();
    },
      
    //Display Session Views
    renderEditableSessionViews: function(sessionid){
      this.sessionEditLeftSideView.render();
      this.sessionEditEmbeddedView.render();
    },
    renderReadonlySessionViews: function(sessionid){
      this.sessionReadLeftSideView.render();
      this.sessionReadEmbeddedView.render();
    },
    
    //Display DataList Views
    renderEditableDataListViews: function(datalistid){
      this.dataListEditLeftSideView.render();
      this.dataListEditFullscreenView.render();
    },
    renderReadonlyDataListViews: function(datalistid){
      this.dataListReadLeftSideView.render();
      this.dataListReadFullscreenView.render();
    },
    
    /**
     * This function triggers a sample app to load so that new users can play
     * around and get a feel for the app by seeing the data in context.
     */
    loadSample : function() {
      var appids= {};
      appids.corpusid = "420C2294-9713-41F2-9FEE-235D043679FE";
      appids.datalistid = "C1659620-63D0-4A0C-8AE0-66E6892D026E";
      appids.sessionid = "7DAF97E5-C44B-4E8C-8F12-D6170BEB74E5";
      
      //all the replication etc happens in authView
      this.authView.loadSample(appids);
      
      this.searchView.loadSample();
    },
    
    /**
     * Save current state, synchronize the server and local databases.
     */
    replicateDatabases : function(callback) {
      var self = this;
      this.model.storeCurrentDashboardIdsToLocalStorage(function(){
        self.model.get("authentication").syncUserWithServer();
        self.model.get("corpus").replicateCorpus(self.model.get("corpus").get("couchConnection"), callback);
      });
    },
    /**
     * Synchronize the activity feed server and local databases.
     * TODO change this line in case it is called on the wrong model
     *  this.activityFeedView.model.pouch(
     */
    replicateActivityFeedDatabase : function() {
      (new ActivityFeedView()).pouch(function(err, db) {
        db.replicate.to(Utils.activityFeedCouchUrl, { continuous: false }, function(err, resp) {
          Utils.debug("Replicate to");
          Utils.debug(resp);
          Utils.debug(err);
        });
        db.replicate.from(Utils.activityFeedCouchUrl, { continuous: false }, function(err, resp) {
          Utils.debug("Replicate from");
          Utils.debug(resp);
          Utils.debug(err);
        });
      });
    },
    
    saveScreen : function() {
      // Save the Datum pages, if necessary
      this.datumsView.saveScreen();
    }
    
  });

  return AppView;
});
