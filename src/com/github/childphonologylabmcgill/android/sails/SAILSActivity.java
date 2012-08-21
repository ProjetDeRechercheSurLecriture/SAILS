package com.github.childphonologylabmcgill.android.sails;

import ca.ilanguage.oprime.activity.HTML5GameActivity;
import android.os.Bundle;
import android.util.Log;

public class SAILSActivity extends HTML5GameActivity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	
        super.onCreate(savedInstanceState);
    }
    protected void setUpVariables(){
    	if(D) Log.d(TAG, "Setting up sails acitivity variables.");
    	this.mInitialGameServerUrl = 
    			"file:///android_asset/release/sails.html";
    	this.mJavaScriptInterface = new SAILSJavaScriptInterface(D, TAG, mOutputDir);
    	this.mJavaScriptInterface.setContext(this);
    }
}