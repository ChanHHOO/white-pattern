import { appendStyle, observeElementCreation } from "contents/util"
import { preprocess } from "contents/processor"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://*.coupang.com/*"]
}

function handleDarkPattern() {
  var processed = preprocess("withdraw-popup")

  console.log("processed", processed)

  fetch("http://localhost:8000/fix-dark-pattern", {
    method: "POST",
    body: JSON.stringify({
      html: processed
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
      .then((response) => response.json())
      .then((result) => {
        let patterns = JSON.parse(result).elementsToUpdate
        console.log(patterns)

        for (let pattern of patterns) {
          appendStyle(pattern.selector, pattern.style, pattern.innerText)
        }

      });
}

window.addEventListener("load", () => {
  console.log("coupang load finished", document)

  observeElementCreation(".withdraw-popup", () => {
    console.log("withdraw-popup detected")
    handleDarkPattern()
  })

})
