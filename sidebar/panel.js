let backgroundPage = browser.extension.getBackgroundPage();
var saveNewBtn = document.querySelector('button[name="save-new"]');
var loadBtn = document.querySelector('button[name="load-sess"]');
saveNewBtn.addEventListener('click', saveSession);
loadBtn.addEventListener('click', loadSession);


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
  var session1 = browser.storage.local.get("session1");
  var tabURLs;
  session1.then((response)=>tabURLs = response.session1.split(", ")).then((response)=>{
    for (var i = 0; i<tabURLs.length; i++) {
      console.log(tabURLs[i])
      var newTab = browser.tabs.create({url:tabURLs[i]});
      newTab.then(onCreated, onError);
    }
  }

  );
}
