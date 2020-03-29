async function getTabs() {
  let tabs = await browser.tabs.query({});
  var current = browser.windows.getCurrent();
  console.log("gettabs")
  current.then((response)=>console.log("windowID: " + response.id));
  console.log(tabs);
}
browser.browserAction.onClicked.addListener(() => {
  console.log(getTabs());
  // browser.tabs.create({"url": "www.google.com"});
});
