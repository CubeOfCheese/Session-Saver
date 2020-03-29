async function saveSession() {
  let tabs = await browser.tabs.query({currentWindow: true});
  var sessionTabs = tabs[0].url;
  for (var i = 1; i < tabs.length; i++) {
    sessionTabs = sessionTabs + ", " + tabs[i].url;
  }
  browser.storage.local.set({ session1 : sessionTabs });
}
browser.browserAction.onClicked.addListener(() => {
  saveSession();
});
