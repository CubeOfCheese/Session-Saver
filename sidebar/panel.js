console.log("this won't show will it");

let backgroundPage = browser.extension.getBackgroundPage();
var saveNewBtn = document.querySelector('button[name="save-new"]');
var loadBtn = document.querySelector('button[name="load-sess"]');
saveNewBtn.addEventListener('click', saveSession);
loadBtn.addEventListener('click', loadSession);

function saveSession() {
  document.body.style.border = "5px solid yellow";
  backgroundPage.saveSession();
}
function loadSession() {
  var session1 = browser.storage.local.get("session1");
  session1.then((response)=>console.log(response.session1.split(", ")));
  console.log("loadSession")
}
