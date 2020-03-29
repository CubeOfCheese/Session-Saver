document.body.style.border = "5px solid red";
let backgroundPage = browser.extension.getBackgroundPage();
console.log(backgroundPage);

function print() {
  document.body.style.border = "5px solid yellow";

  backgroundPage.getTabs();

  console.log("Hi I did it")
}
