import { Storage } from "@plasmohq/storage"

import { DomChanger, onLoad, PAGE, SITE } from "./dom-changer"

console.log("js script loaded")

export const config = {
  matches: ["https://www.coupang.com/", "https://www.coupang.com/?*"]
}

// onLoad(function () {
//   console.log("onLoaded")

//   var domChanger = new DomChanger(SITE.COUPANG)
//   domChanger.run(PAGE.MAIN)
// })

const storage = new Storage()

storage.get("focus").then((r) => {
  if (r === true) {
    var domChanger = new DomChanger(SITE.COUPANG)
    domChanger.run(PAGE.MAIN)
  }
})

storage.watch({
  focus: (v) => {
    if (v.newValue === true) {
      var domChanger = new DomChanger(SITE.COUPANG)
      domChanger.run(PAGE.MAIN)
    } else {
      window.location.reload()
    }
  }
})
