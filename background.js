browser.storage.local.set({ sessionCounter : 1 });

async function saveSession() {
  let tabs = await browser.tabs.query({currentWindow: true});
  var sessionTabs = tabs[0].url;
  for (var i = 1; i < tabs.length; i++) {
    sessionTabs = sessionTabs + ", " + tabs[i].url;
  }
  browser.storage.local.set({ session0 : sessionTabs });
  var numberOfSavedSessions = browser.storage.local.get("sessionCounter");
  numberOfSavedSessions++;
  browser.storage.local.set({ sessionCounter : numberOfSavedSessions });
}
browser.browserAction.onClicked.addListener(() => {
  saveSession();
});
