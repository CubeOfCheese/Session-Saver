browser.storage.local.set({ sessionCounter : 0 });

async function saveSession() {
  let tabs = await browser.tabs.query({currentWindow: true});
  var sessionTabs = tabs[0].url;
  for (var i = 1; i < tabs.length; i++) {
    sessionTabs = sessionTabs + ", " + tabs[i].url;
  }
  var numberOfSavedSessions = browser.storage.local.get("sessionCounter");
  numberOfSavedSessions.then((response)=> {
    var newCount = response.sessionCounter + 1;
    var sessionId = "session " + newCount;
    browser.storage.local.set({ [sessionId] : sessionTabs });
    browser.storage.local.set({ sessionCounter : newCount });
  });
}

browser.browserAction.onClicked.addListener(() => {
  saveSession();
});
