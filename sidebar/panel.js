let backgroundPage = browser.extension.getBackgroundPage();
let sessionList = document.querySelector('ul[id="session-list"]');
var saveNewBtn = document.querySelector('button[name="save-new"]');
var loadBtn = document.querySelector('button[name="load-sess"]');
saveNewBtn.addEventListener('click', saveSession);
loadBtn.addEventListener('click', loadSession);

var numberOfSavedSessions = browser.storage.local.get("sessionCounter");
numberOfSavedSessions.then((response)=>{
  console.log(response.sessionCounter);
  for (var i = 0; i < response.sessionCounter; i++) {
    console.log("in loop")
    var session = browser.storage.local.get("session" + i);
    session.then(()=>{
      var button = document.createElement("BUTTON");
      button.innerHTML = "session" + i;
      button.onclick = loadSession;
      sessionList.append(button);
    });
  }
})


function saveSession() {
  backgroundPage.saveSession();

}

function onCreated(tab) {
  console.log(`Created new tab: ${tab.id}`)
}

function onError(error) {
  console.log(`Error: ${error}`);
}


function loadSession() {
  var session0 = browser.storage.local.get("session0");
  var tabURLs;
  session0.then((response)=>tabURLs = response.session0.split(", ")).then((response)=>{
    for (var i = 0; i<tabURLs.length; i++) {
      console.log(tabURLs[i])
      var newTab = browser.tabs.create({url:tabURLs[i]});
      newTab.then(onCreated, onError);
    }
  }

  );
}
