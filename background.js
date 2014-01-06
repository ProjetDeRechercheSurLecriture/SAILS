/**
 * Listens for the app launching then creates the window.
 * Ignores the provided window size.
 *
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    width: 1280,
    height: 800,
  });
  chrome.app.window.create('index.html', {
    width: 1024,
    height: 768,
  });
});
