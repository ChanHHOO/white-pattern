import { onLoad } from "./dom-changer"
import { DomChanger, SITE, PAGE } from "./dom-changer"

export const config = {
  matches: ["https://www.coupang.com/vp/products/*"]
}

console.log('js script loaded');

onLoad(function () {
  console.log('onLoaded');

  var domChanger = new DomChanger(SITE.COUPANG);
  domChanger.run(PAGE.PRODUCT);
});
