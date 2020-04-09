let backgroundPage = browser.extension.getBackgroundPage();
let sessionList = document.querySelector('ul[id="session-list"]');
var saveNewBtn = document.querySelector('button[name="save-new"]');
saveNewBtn.addEventListener('click', saveSession);

// when extension started, updates ui with load-session-buttons
var numberOfSavedSessions = browser.storage.local.get("sessionCounter");
numberOfSavedSessions.then((response)=>{
  for (var i = 0; i < response.sessionCounter; i++) {
    var session = browser.storage.local.get("session " + i);
    session.then(()=>{
      var button = document.createElement("BUTTON");
      button.innerHTML = "session " + i;
      button.onclick = function(){loadSession("session " + i)};
      sessionList.append(button);
    });
  }
});

// used to add new button when a session is saved
function updateUI() {
  var numberOfSavedSessions = browser.storage.local.get("sessionCounter");
  numberOfSavedSessions.then((response)=>{
      var session = browser.storage.local.get("session" + response.sessionCounter);
      session.then(()=>{
        var button = document.createElement("BUTTON");
        button.innerHTML = "session " + (response.sessionCounter + 1);
        button.onclick = function(){loadSession("session " + (response.sessionCounter + 1))};
        sessionList.append(button);
    }
  )})
}

function saveSession() {
  backgroundPage.saveSession();
  updateUI();
}

function onCreated(tab) {
  console.log(`Created new tab: ${tab.id}`)
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function loadSession(sessionKey) {
  var session = browser.storage.local.get(sessionKey);
  session.then((response)=>{
    var tabURLs = response[sessionKey];
    for (var i = 0; i<tabURLs.length; i++) {
      var newTab = browser.tabs.create({url:tabURLs[i]});
      newTab.then(onCreated, onError);
    }
  });
}
