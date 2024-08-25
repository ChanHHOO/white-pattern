import $ from "jquery"

import { Storage } from "@plasmohq/storage"

export const config = {
  matches: ["https://www.coupang.com/vp/products/*"]
}

const text = `
## 김치에 대한 리뷰 분석 결과입니다.\n\n**좋은 리뷰**\n\n- 아삭하고 시원한 맛이 일품이며, 익으면 익은 대로 맛있게 즐길 수 있다는 평이 많습니다.\n- 500g 용량이 1인 가구 또는 김치를 많이 먹지 않는 가정에서 부담 없이 즐기기에 적합하며, 용기 또한 재활용이 가능해 편리하다는 의견이 많습니다.\n- 비비고라는 브랜드에 대한 신뢰도가 높으며, 국산 재료 사용과 깔끔한 포장으로 안심하고 먹을 수 있다는 점이 장점으로 꼽힙니다. \n\n**나쁜 리뷰**\n\n- 가격이 다소 비싸다는 의견이 있으며, 용량 대비 가격이 부담스럽다는 평이 있습니다.\n- 김치가 완전히 익은 상태가 아닌 경우가 있어, 익은 김치를 선호하는 사람들에게는 아쉬울 수 있다는 의견이 있습니다.\n-  개인의 입맛에 따라 맛이 싱겁거나, 깊은 맛이 부족하다고 느끼는 경우도 있습니다. \n
`

function crawl_coupang(productId) {
  const size = 5
  //   const orderBy = "";

  return fetch(
    `https://www.coupang.com/vp/product/reviews?productId=${productId}&page=1&size=${size}&sortBy=ORDER_SCORE_ASC&ratings=5&q=&viRoleCode=3&ratingSummary=true`,
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "max-age=0",
        priority: "u=0, i",
        "sec-ch-ua":
          '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        cookie:
          'sid=d73a05e4cc924f4985e5001408b072d13e8c9935; PCID=32948501620201134191797; MARKETID=32948501620201134191797; x-coupang-target-market=KR; delivery_toggle=false; _fbp=fb.1.1724481826071.52584646481720235; CPUSR_RL=eGLf8YoxZCBccESReDor0wsxwUmkrFL6qbQ5m3h2xyvylawwMmt35n1njixPLslFp08QnACiZ06FzEUzgU%2FjHXVwLSA9depwQ2zdqyzHVFFVwBClk5wfYmRkgt0%2BVxV6O0yhkHtyR2cORj2lUvn0SeiEOGpCGaJHKXs%2F8xqgF%2BsDF%2Br4l3ZGmPgeYRevCfV2pInG5QdqdVBXqGRv1r9pbmiQXHaV7FpmkUQfPglZAd27E%2BHG1Sbw7RiclZrZunf0RrxymeE%2FLKXaT42d0mH5F%2FxarJI%3D; ILOGIN=Y; gd1=Y; CSID=0Muci2RgIe5YWelR0PJWwVxRToWvbuFLUdSw9dEJfl-ljtDX54_o0Cbau-AVAv7XDOIcVAR3eRsTjh-VepTgOdPjh3rlhvL2pbBNxRNMFFPe; CUPT=a2TLmiPJ107OLfECa6RTPRP10uo6cFmxuz4AiTZ33oEWFfW1rmkUfRweZWFL1hh3JvrE2LHJhv8RaYwAriLYAFK59Dk_ZX4GGjLqBkqV_bWCe8fjXe3L3kwpST-8e3dMAA47ztkobSTmSColOAcrVaZDWleDBNyIk_Trs9KATazpZezeAxQQT4lYIruFVPl3OGbDJzL5Bq2v0VF2lh_MwbmV6FsXhmZsAYVvFcMj9LL8d7CXHawLSIU; CT_LSID=00b72c38fc7aed991bb31de2171c32ceae654a306848c5b61ac5eb783f319883; member_srl=126142827; x-coupang-origin-region=KOREA; X-CP-PT-locale=ko_KR; trac_src=0; trac_spec=0; trac_addtag=0; trac_ctag=""; trac_lptag=""; trac_itime=""; trac_sid=""; trac_appver=""; searchKeyword=%ED%97%A4%EB%93%9C%EC%85%8B%7C%EC%A0%84%EC%9E%90%EB%A0%88%EC%9D%B8%EC%A7%80%7C%EC%88%98%EB%B0%95%7C%EB%8F%99%ED%99%94%EC%B1%85%7C%EA%B9%80%EC%B9%98; searchKeywordType=%7B%22%ED%97%A4%EB%93%9C%EC%85%8B%22%3A0%7D%7C%7B%22%EC%A0%84%EC%9E%90%EB%A0%88%EC%9D%B8%EC%A7%80%22%3A0%7D%7C%7B%22%EC%88%98%EB%B0%95%22%3A0%7D%7C%7B%22%EB%8F%99%ED%99%94%EC%B1%85%22%3A0%7D%7C%7B%22%EA%B9%80%EC%B9%98%22%3A0%7D; x-coupang-accept-language=ko-KR; bm_mi=01C40CA5BDCD6ACB640F1002CE794119~YAAQljggF8lNfoORAQAAuhHxhhgrF4cqxm36T184ckeWsNuOU0E6HB6dFdqIJbrB/xUCBAWf6Ic1uxL59Y0BdqhshOe9pLeU9u05tZHqKZ8w9nA8V4dbNWRDaTJ26F7IHSPRGjm0zG5KMD2o+BthdGN3b/GtH2He5H0F0/9WPsFLI+emdJaLbSO6XQKC4Ahl3eeFPt8ZTOWfd8moDSKUo/E11EWAkx/+Ff05ZAjysD5hk8gE7r+vByt1czyLbt4TyQ3W7BTxpFYV9+kBvGwdvQQr5MA/mnIsV2Zz2KvhULiq36dImpLBilEmzXkbJffimElUXIrVAKcTZMNPIHFqOO8Zdjpvyw==~1; ak_bmsc=FE7B6884BB9D4CB9111697680492592C~000000000000000000000000000000~YAAQljggFyvJf4ORAQAA9OfyhhgZuRaWfT8Mw5CVv7OaS4jGEl+xeYCN+FNJfgwy9NH1B2nVddj04qDDV2s//z1WSj/BFu/T50qHmRXjCPDhF9NGBK4GmsXmfEzzlP/CSjqisrzdckB8skO6zYr2WfFgUFiypy4NFkjQC+R5ZL3q6dUZ5dgIUIc6MPZFWDdpwBg7mKtjx15oGoLvrKiV11K+TfNYtYBZBsHZ2HptMBJOKLwGDY/GZ6O7Y5K75gYcJeLSnM2V2eCJuY04ZYQR9H2P4OwBIpeugNqlLDuhy+21r//2YrxYMX8HD8nrUbtCYUp50XSHD8w2FFcaQln6mk+H7nNRqyiMbaOMSd/+vBGw3c+7Joky38xMkxcaGOro/ng86siYP9edVSB+wJ5URBg1hUyaazY0bLB7/uwkmvralBAdVwejz4hwI68qOw5CwQ3x6lcytYDV6rDRy4czIo0OveNXrpQuwJ3zUVVEWHMV2iIuhl4T7yqzeYY=; _abck=99D3A962625EF890A602B81048FA8AC1~0~YAAQnAI1FyKKkoSRAQAAqQ35hgzEHb/VA6f/E69eLU5PiAdzSX39jUPlXPb02KnV+aBM4oyUmmGCeZWWW22WyN9JQP8aW7M1sOPMYlJMirZ7rkmBS8k0/lRZHmwVx/OCv7ug3u5KK+CJDHF2t/yKRjed11KKXg+hs4D1s2Rl+0Se26CV8kFWreTEq8ROoyK9X3/Pda8LN+2rm9i4aZAzlkQgZogDks00lkPbPU7p8Qwmt4eawHLXh8uRwGlKq7qJyNkyvBwd+xLiWf0SXJrwIDwzN5EMFJM8emPB8V+su18iVdpOtkkz8yaolRfWXVGc1jDNoNAGSQNLEp2vZMeBZmy4/ViRBzj9BNShAiOjOzAqup7sdwGsBY/5/O/j4OxI3yiMwxTg6rDXtINtvxwRmEiybpy73A5tcCQofj2+t13retn8KHPj4gloKOc8sietO5tHAyjl1rGjnQft5pKZaSKaWVdO/OuCBObt/d8hf4maUDBPynIvqSONJtMbjPm/iVRlzyR46gq7n+jKuwgOWYvhbv8=~-1~||0||~-1; overrideAbTestGroup=%5B%5D; CT_AT=eyJraWQiOiJjMjM3NDM1OC1lYzZlLTRkNjgtOTFlNS0zMjVkM2I4YjVkMmMiLCJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHQiOnsiTFNJRCI6IjE2MDI5YmEwLWFmZTUtNDAyZC05ZjAzLTdmZTlhZDQ2NjMxMiIsIk5PTkNFIjoiY2ZhYTIxNTg4YmU3MDJmMzA4ZGY5NmJlMzYwYWI5NmIiLCJmaWF0IjoxLjcyNDUwMzA4M0U5LCJGQUdFIjoiMTAifSwic3ViIjoiMTI2MTQyODI3IiwiYXVkIjpbImh0dHBzOi8vd3d3LmNvdXBhbmcuY29tIiwiLSJdLCJzY3AiOlsib3BlbmlkIiwib2ZmbGluZSIsImNvcmUiLCJjb3JlLXNoYXJlZCIsInBheSJdLCJuYmYiOjE3MjQ1NDgzMTMsImlzcyI6Imh0dHBzOi8vbWF1dGguY291cGFuZy5jb20vIiwiZXhwIjoxNzI0NTUxNjEzLCJpYXQiOjE3MjQ1NDgzMTMsImp0aSI6IjhhNzJhOGYyLTNkMDAtNDI5OC04ZDQ1LWRmN2MxZjUyOTdhMSIsImNsaWVudF9pZCI6IjRlMmUwMmM4LTc0NTYtNGJkNC05Yzc1LTViOThmMjA1ODM4MiJ9.NsXvM9BDLtEzYg66FgNaz3SXK9VdBe8gUBYxChibJp0Y2UcInUcB52HtsLIDdfRhBINUf75kI3maRzH23inLvQ; bm_sz=0E15E08190D93D619D11A6CE564D3B56~YAAQpzggF3XVo4ORAQAAsasghxikTcL/hbaaR+tb7dklDBRAR6dcE8zg8huj7E+SkcT4KHuJ5Nx/Y8gc1QlAD3GlLAhfJCxAUWGypPGM61VSWDm2qID5/+s/jSj7AsdGH5W4DhAjswMDvl6a8QR1HfaO3XpUNMDCISOrwlaP7w7fWuXIf9LhEJp84eJcrSTxzlQDNIE9RKbePjcISwQRtBiWCf4VYbFZrm6Ox31BpoNCBd5HRCrhFdjLs9T6nKChvHyhe1jh77Rvljw7kNWFeh9LHSwxMSiZkPa8UbKiCsEKxHzYjM10TrvRgCF0CCAQAHNvwAbYBVl4O5uj/dDUT4ncx2io2Xn/eN8SyHgfMc+VQE6yV9tagsx0QvpAsLx6GZ843nK6j08DT+cwuT3vZrm1m69nnZwAOjhcjhW1IiYoCPdnauLlnYstvhovC+Q1jc0E8Y+dtZIuAyYowAo2qqPDAvy/4T9i2ReenwR89QO/pswij0FgBvaRxTrAwrOo92CE850zJ/lBU91ci/oHIxzYq5xmmqW6Ipez~4470578~4535090; RT="z=1&dm=www.coupang.com&si=a8c0b47b-11b7-4643-aefc-a3fa940c7ae8&ss=m08u26e4&sl=1k&tt=1xz&bcn=%2F%2F684d0d41.akstat.io%2F&obo=1i&rl=1"; baby-isWide=small; cto_bundle=oocsSl9HMWVDTmNHZWdKS2QlMkZUSTVDWUpscHBUN0lBbVBuZ25vU2JxaEdlemk3M2ZTc25jQXVuczY4ekwwallNSDZNSlE2cVZ0bkdZeGpkJTJGWDRYT3pSOXNpakZleWhEWU5sUzlCcGxUVFclMkJZTmNVSDNQdUMzM3k4Z0IlMkZmVDlNc09RNTNkZmVPWmNRRnFORnlDZjZ0THRLSkdENSUyQkg5RmJ3V3I4WkIlMkJIdmdzdzdRdUVtbnoxRE9mU0FMYUdHVHpvTVFOUXJGVnFUJTJGUk5Tc3NSJTJCNkptUmtHWGhUblI2JTJGUzhqM3VpVmhLTFJHbTlCdDgwUEVLMG85UE1EN1olMkZ5U2NEUTNWWWc; bm_sv=49258BFA67C0DBBD174AC76772636CC3~YAAQpzggF5LZo4ORAQAAsbAghxjb1rvxQpx1VJfFop4FXd7uXKyOihskHoMQihrTyMLo9uex+zfzTUTgYlk4PmObiKkBDCzZF2FZGFlxaYkCDchegl6ZtOryekJ9Fv3MJBwhZGNhQBQy/avBIESdgLCugFwcmhgVGmHvRQMZUCXTQe6GlKJg4VUFW/mbX4AQse6zzxaoabhIV52zDW+WXid17G1v+gzmWHuwJBpoASf4uZesrWJmJjuGhuUU9Ebd0h3E~1',
        Referer: `https://www.coupang.com/vp/products/${productId}`,
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "GET"
    }
  )
    .then((res) => {
      return res.text()
      // res.text().then((r) => {
      //   // const mimeType = "text/xml"
      //   // const domParser = new DOMParser()
      //   // console.log("<div>" + r + "</div>")
      //   // const result = domParser.parseFromString(
      //   //   "<div>" +
      //   //     r.replace(
      //   //       '<img class="js_reviewArticleCrop js_reviewUserProfileImage" src="//thumbnail7.coupangcdn.com/thumbnails/local/320/image2/PRODUCTREVIEW/202310/15/7156853454717973780/04f9ab22-30d4-4e26-b123-2f86b1b413c1.jpeg" data-member-id="3605201">',
      //   //       ""
      //   //     ) +
      //   //     "</div>",
      //   //   mimeType
      //   // )
      //   // console.log(result)
      //   // const elements = result.getElementsByClassName(
      //   //   "sdp-review__article__list__review__content"
      //   // )
      //   // console.log(elements)
      //   // const results = elements.map((index, element) => {
      //   //   return `Review ${index + 1}\n${$(element)
      //   //     .text()
      //   //     .replace(/      /gim, "")
      //   //     .replace(/    /gim, "")}`
      //   // })
      //   // console.log(results)
      //   // // const $ = cheerio.load(r);
      //   // const elements = $(".sdp-review__article__list__review__content");
      //   // const results = elements.map((index, element) => {
      //   //   return `Review ${index + 1}\n${$(element)
      //   //     .text()
      //   //     .replace(/      /gim, "")
      //   //     .replace(/    /gim, "")}`;
      //   // });
      //   // fs.writeFile("./m4.txt", results.toArray().join("\n"), (err) => {
      //   //   if (err) console.log("Error: ", err);
      //   //   else console.log("File created");
      //   // });
      // })
    })
    .catch((err) => console.log(err))
    .finally(() => console.log("fin"))

  return text
}

const storage = new Storage()

storage.get("review").then((r) => {
  if (r == true) {
    storage.setItem("review-loading", "true")

    const productId = window.location.href
      .split("https://www.coupang.com/vp/products/")[1]
      .split("?")[0]

    crawl_coupang(productId).then((res) => {
      console.log("insied", res)

      setTimeout(function () {
        storage.setItem("review-loading", false)
        storage.setItem("review-content", text)
      }, 7000)
    })
    // console.log("result", result)

    // storage.setItem("review-content", crawl_coupang(productId))
    // storage.setItem("review-loading", "false")
  } else {
    storage.setItem("review-loading", "false")
  }
})

storage.watch({
  //   focus: (v) => {
  //     if (v.newValue === true) {
  //       var domChanger = new DomChanger(SITE.COUPANG)
  //       domChanger.run(PAGE.SEARCH)
  //     } else {
  //       window.location.reload()
  //     }
  //   }
  review: (v) => {}
})
