async function saveSession() {
  let tabs = await browser.tabs.query({currentWindow: true});
  var current = browser.windows.getCurrent();
  current.then((response)=>console.log("windowID: " + response.id));
  console.log(tabs);
  var sessionTabs = tabs[0].url;
  for (var i = 1; i < tabs.length; i++) {
    console.log(tabs[i].url);
    sessionTabs = sessionTabs + ", " + tabs[i].url;
  }
  browser.storage.local.set({ session1 : sessionTabs });
}
browser.browserAction.onClicked.addListener(() => {
  console.log(saveSession());
  // browser.tabs.create({"url": "www.google.com"});
});
