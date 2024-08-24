import { onLoad } from "./dom-changer"
import { DomChanger, SITE, PAGE } from "./dom-changer"

console.log('js script loaded');

export const config = {
  matches: ["https://www.coupang.com/", "https://www.coupang.com/?*"]
}

onLoad(function () {
  console.log('onLoaded');

  var domChanger = new DomChanger(SITE.COUPANG);
  domChanger.run(PAGE.MAIN);
});
