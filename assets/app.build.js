({
  baseUrl : "./public",
  dir : "./release",
  optimize : 'none',
//  optimize : 'uglify',
//  uglify: {
//    toplevel: true,
//    ascii_only: true,
//    beautify: true,
//    max_line_length: 1000
//  },
//  inlineText: true,
//  namespace: 'sails',
  skipModuleInsertion: false,
//  stubModules: ['underscore', 'jquery','backbone'],
//  wrap: {
//    start: "(function() {",
//    end: "}());"
//  },
  mainConfigFile : "../../DyslexDisorthGame/assets/public/main_sails.js",
  modules : [ {
    name : "main"
  } ]
})