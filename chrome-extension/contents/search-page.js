import { Storage } from "@plasmohq/storage"

import { DomChanger, onLoad, PAGE, SITE } from "./dom-changer"

export const config = {
  matches: ["https://www.coupang.com/np/search*"]
}

console.log("js script loaded")

// onLoad(function () {
//   console.log("onLoaded")

//   var domChanger = new DomChanger(SITE.COUPANG)
//   domChanger.run(PAGE.SEARCH)
// })

const storage = new Storage()

storage.get("focus").then((r) => {
  if (r === true) {
    var domChanger = new DomChanger(SITE.COUPANG)
    domChanger.run(PAGE.SEARCH)
  }
})

storage.watch({
  focus: (v) => {
    if (v.newValue === true) {
      var domChanger = new DomChanger(SITE.COUPANG)
      domChanger.run(PAGE.SEARCH)
    } else {
      window.location.reload()
    }
  }
})
