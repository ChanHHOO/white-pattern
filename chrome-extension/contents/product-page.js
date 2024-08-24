import { Storage } from "@plasmohq/storage"

import { DomChanger, onLoad, PAGE, SITE } from "./dom-changer"

export const config = {
  matches: ["https://www.coupang.com/vp/products/*"]
}

console.log("js script loaded")

const storage = new Storage()

storage.get("focus").then((r) => {
  if (r === true) {
    var domChanger = new DomChanger(SITE.COUPANG)
    domChanger.run(PAGE.PRODUCT)
  }
})

storage.watch({
  focus: (v) => {
    if (v.newValue === true) {
      var domChanger = new DomChanger(SITE.COUPANG)
      domChanger.run(PAGE.PRODUCT)
    } else {
      window.location.reload()
    }
  }
})
