import fs from "fs";
import * as cheerio from "cheerio";

// const COUPANG_PRODUCT_BASE_URL = "https://www.coupang.com/vp/products";
// const COUPANG_REVIEW_BASE_URL = "https://www.coupang.com/vp/product/reviews";
// const productId = "8105774369";

function crawl_coupang(productId: string) {
  const size = 30;
  //   const orderBy = "";

  fetch(
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
          'sid=d73a05e4cc924f4985e5001408b072d13e8c9935; PCID=32948501620201134191797; MARKETID=32948501620201134191797; x-coupang-target-market=KR; delivery_toggle=false; _fbp=fb.1.1724481826071.52584646481720235; searchKeyword=%ED%97%A4%EB%93%9C%EC%85%8B; searchKeywordType=%7B%22%ED%97%A4%EB%93%9C%EC%85%8B%22%3A0%7D; CPUSR_RL=eGLf8YoxZCBccESReDor0wsxwUmkrFL6qbQ5m3h2xyvylawwMmt35n1njixPLslFp08QnACiZ06FzEUzgU%2FjHXVwLSA9depwQ2zdqyzHVFFVwBClk5wfYmRkgt0%2BVxV6O0yhkHtyR2cORj2lUvn0SeiEOGpCGaJHKXs%2F8xqgF%2BsDF%2Br4l3ZGmPgeYRevCfV2pInG5QdqdVBXqGRv1r9pbmiQXHaV7FpmkUQfPglZAd27E%2BHG1Sbw7RiclZrZunf0RrxymeE%2FLKXaT42d0mH5F%2FxarJI%3D; ILOGIN=Y; gd1=Y; CSID=0Muci2RgIe5YWelR0PJWwVxRToWvbuFLUdSw9dEJfl-ljtDX54_o0Cbau-AVAv7XDOIcVAR3eRsTjh-VepTgOdPjh3rlhvL2pbBNxRNMFFPe; CUPT=a2TLmiPJ107OLfECa6RTPRP10uo6cFmxuz4AiTZ33oEWFfW1rmkUfRweZWFL1hh3JvrE2LHJhv8RaYwAriLYAFK59Dk_ZX4GGjLqBkqV_bWCe8fjXe3L3kwpST-8e3dMAA47ztkobSTmSColOAcrVaZDWleDBNyIk_Trs9KATazpZezeAxQQT4lYIruFVPl3OGbDJzL5Bq2v0VF2lh_MwbmV6FsXhmZsAYVvFcMj9LL8d7CXHawLSIU; CT_LSID=00b72c38fc7aed991bb31de2171c32ceae654a306848c5b61ac5eb783f319883; member_srl=126142827; x-coupang-origin-region=KOREA; X-CP-PT-locale=ko_KR; x-coupang-accept-language=ko-KR; CT_AT=eyJraWQiOiJjMjM3NDM1OC1lYzZlLTRkNjgtOTFlNS0zMjVkM2I4YjVkMmMiLCJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHQiOnsiTFNJRCI6IjE2MDI5YmEwLWFmZTUtNDAyZC05ZjAzLTdmZTlhZDQ2NjMxMiIsIk5PTkNFIjoiY2ZhYTIxNTg4YmU3MDJmMzA4ZGY5NmJlMzYwYWI5NmIiLCJmaWF0IjoxLjcyNDUwMzA4M0U5LCJGQUdFIjoiMSJ9LCJzdWIiOiIxMjYxNDI4MjciLCJhdWQiOlsiaHR0cHM6Ly93d3cuY291cGFuZy5jb20iLCItIl0sInNjcCI6WyJvcGVuaWQiLCJvZmZsaW5lIiwiY29yZSIsImNvcmUtc2hhcmVkIiwicGF5Il0sIm5iZiI6MTcyNDUwNzUyMywiaXNzIjoiaHR0cHM6Ly9tYXV0aC5jb3VwYW5nLmNvbS8iLCJleHAiOjE3MjQ1MDkzODMsImlhdCI6MTcyNDUwNzUyMywianRpIjoiZmE3ZGJiNDktZTE2ZS00ZjQwLWIwNmYtMTEyZDBmYWZjY2FmIiwiY2xpZW50X2lkIjoiNGUyZTAyYzgtNzQ1Ni00YmQ0LTljNzUtNWI5OGYyMDU4MzgyIn0.ly4ScjP0pT6e2MsDZ53c03zkSqHmHh0DU1Ud2ryUF9lenu7Ip431WyvCDlkIeiOG6pKFVhixGSgd1s7Cv0x4aA; overrideAbTestGroup=%5B%5D; bm_mi=16A9EC6A6E36A9815BB54D9BFA7B421A~YAAQl5/YF8Dnv3uRAQAAeo6ohBhEIeSK0HVBXT+umllIsdtSI/fZ9LrJv8W5H1nBVZrsG6FbUGfsjfkTee9SILygjS6gTsYu7UBNo9YQhOPfFq+U2OSW/Jz0h/t8Lc2u5fcysAb/bdxTLMo8XXi0dbkyoo61hNZgq+9/sDFE8v+F9X1X5NSUwhgA3HZXqdqWLK3JRQEANbTpRJ747OncVx0Rs3KrbQg3ElMMuZtwm1FqrPf16Iy6yKZ5U7eY0Z9D6HUuu7nINkD11MsJ1BxBIroj7bNxxXGPT+ZREe4PZB09pbyEBwYMNdZ/4POu6lqnO1tU+t05h38HxBZxwKdDCWR5pkhvFQ==~1; ak_bmsc=A928F9F11B4295939AFD9576FEE9EDBD~000000000000000000000000000000~YAAQl5/YF4cEwHuRAQAADLuohBifamMNzfx1Oaty86s8nXN4F4UMG00bKJucwq0PDKhwLHVJbCeHYMLGSnK5pGpEagjymG1FzABV3K0Ii0pDwuCV4v3TuceAs0GzfAOoYqIXxxiwAI4XZnMWZiPuK535aNsWwtr7fpWAMnEHxxVGRAXEuVaqE8lz3eFE9aFwwtFeeFWRkSpJR4EdFzH7qPxhLi/1Gq6M4lYTLJ/apGP0wHuM3n/HaOP1/CgRb867jJ+Gd8OS86H1i7ojSsRStXXHYPEWND6zu6lEJrqo+42iII4bTtdS/ahDSa1Ff/HAosXekTxBija1ONHqxmIRrL+QHMBLO8Gv82K6WAdjpLjCrB5TEMHWEdOY6bM/TfgDkKpookNQbwzRYhskL9IbdnCb7FUh+1BJxURLVj1VQ6zNjNvyFJ59JkyK+s+zuaB7ukqNRJoEN53g9/mGXBugraIldZxptUPd25JvBLsEsoPPiS3vl1K73JS99gE=; bm_sz=FDA8330DCCBEF0B4258143A23FA75B16~YAAQl5/YF4kEwHuRAQAADbuohBiTqmxxVs0KS2/jxYjwbgvNy1ocNoQIiuz38BLgaCOrcwiudf06ldBHQXo0BiG0bAFCHRehDxu64Eg+Cx5lRMpxSWhlerz3Z/GEW2lZ5x4oeIEe2FkRSFvQ4CPiXtKuDMvMMdDjo9JaUu1LoH8idGZcqvZKhei/ZLJUkocOX3Gn8sd5M4SQW7s7+rcr2o4gbCjD5HSZAlxj0hAkDAyO+AsmdHLbFGslkJBjPPOgwLtaFe3aI2Dv/WRtV12iqL4rOSZi4uioohU9hKmtBx98EYFFOslxKD0PamPgRBkEfM/W+65Xa6hVaxfAUcIL83JMUv67BeJn41/Zb9W0bPzu9hsOvHQsp/ik1UvQJtCQMS7KpP2wf8/s3ELG1aNnTuiIlaSNGoq9uii8G6ZgGRYT7VOVFyBmRJvxbUbz78kZsCTkkf39yo7tXaZgFgV0w4fI9SW4LTqsuo6PTzosJIs8GVv9nIPl0DMblOg3wXQHMtmOCowQ7MCM6QMIPGC8m5VEYCuk/ZAkxD3RHJkZQg==~3556421~3160374; baby-isWide=small; cto_bundle=ESYXml9HMWVDTmNHZWdKS2QlMkZUSTVDWUpscHI4a1FQWTV6bjJYUUFDZUJmN0JKUG9FUENad1ZNbTl0YkxqJTJCZ3h5MDNlRyUyRkREeG1GOGRKNHlIZHNHS3ZIN3pWY1dBMTNhN3ZzR05lWVRIR081Qmk2YzlENU1OMGtGNXVrd1RpTHlyUDJEbk5BbWxkY29hckwlMkZqNno3UWkyTDNWa29zQTNqNjVhUTNGU2dSMWswclAxWXhtYWpraEFLUXMxb0VnS3F2R0x3SjRiYlR4MTBhVFQ2VGllOHclMkI1bzNHbmhsZVBVTnhhbXFNTmVEbjhYdWYlMkJKalFXQkRlJTJGbUklMkYlMkJOVVFOOTUyQ0dh; RT="z=1&dm=www.coupang.com&si=a8c0b47b-11b7-4643-aefc-a3fa940c7ae8&ss=m082o878&sl=k&tt=ly6&bcn=%2F%2F684d0d42.akstat.io%2F&obo=1&ld=4l7dr"; _abck=99D3A962625EF890A602B81048FA8AC1~0~YAAQl5/YF/gMwHuRAQAA1cWohAw0D2NIjhfeGF3I9oa+YCpmZhuHkW66/9DEW1d3FMnUEueA+sp8uc5pn+gUnE82vywJr6o2nETWW3qdeeQ3xuClKvV80bS1yu9fmsPkrZC21UOmI7r35Yt4fzHygbpBmtm7Hy/0pwMcB1v2CbDW7RacMJZ4++IrJ7X7/xUZ9jEUP00PXM5xjfrmHchUrPb32jzgm8LqBuGR4EHvdrNMLl786cdx6emYpxj4WbFxvqkqGJsn1ekV0xc72X2V59kCsgsNkpjM7cwVfecVE5iwuhoPuzV2kp7kFcK4c6fyOLsd8h7f6yq1AXVR2EO5ieS9VbtVgFXtD6o2HRpMKmk4f8HggBNPURw0ahF8d7GHow84rwi+WDjxA7Y7uR1gbRffSq76bEa96L9eD0lVapEPB76z1gkGjciyCf9BtfEgZsKtK/huS3mvwXdFl7AydsM4itHmO42T3rLrlkH6/3/2wVnNTyWsxh/n1iR4lsdVM2vs4GVmbsfZMn+wO0tbfJaiWy4=~-1~||0||~-1; bm_sv=FD26F8F3E3FF10E44C2525272060227C~YAAQl5/YF+UPwHuRAQAATcqohBhl/EuJhxwsLGHc4ZKe11a1j62cl9rry/OZoaa/iHuWn4O0zE1jq5B2vQoydyKRPdu5MPA2tIKtfIAvVzxf9XtxQkZEDvB4A6obXGoVJwpF+3vqrP+GGaslH0X0JLS4utxKOVYl2Z0BBZs4VDis7rmNKJ4AFWZunF8xDjABVN+vOnJ2CGNx1PLS5gKl+AjWWjdUnmZzctlDJSXuWNs5NqzOiHImlolX9NyYmo6s1g==~1',
        Referer: `https://www.coupang.com/vp/products/${productId}`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  )
    .then((res) => {
      res.text().then((r) => {
        const $ = cheerio.load(r);

        const elements = $(".sdp-review__article__list__review__content");

        const results = elements.map((index, element) => {
          return `Review ${index + 1}\n${$(element)
            .text()
            .replace(/      /gim, "")
            .replace(/    /gim, "")}`;

          fs.writeFile(
            "./test1.txt",
            `${$(element)
              .text()
              .replace(/      /gim, "")
              .replace(/    /gim, "")}`,
            (err) => {
              fs.readFile("./test1.txt", "utf8", (err, data) => {
                console.log(data);
              });
            }
          );
          //   console.log(
          //     `${$(element)
          //       .text()
          //       .replace(/      /gim, "")
          //       .replace(/    /gim, "")}`
          //   );

          //   console.log("!!!!");
        });

        fs.writeFile("./m4.txt", results.toArray().join("\n"), (err) => {
          if (err) console.log("Error: ", err);
          else console.log("File created");
        });
      });
    })
    .catch((err) => console.log(err))
    .finally(() => console.log("fin"));
}

function crawl_temu(productId: string) {
  fetch(
    "https://www.temu.com/kr/api/bg/engels/reviews/list?goods_id=601099518587303&page=3&size=10&need_max_size=true&sort_type=0&goods_review_label_show=true&label_id=400000185",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "anti-content":
          "0aqAfqnydiPssgm2o0eWDXDgu8GT9DzwqcylJRmW3HPY-xGcZEDcAw923Mu67mBe8E6u8xupxc-wSmaQPTFPv_6Ns9uO93jysd_0P1SCywAtU5egQ16vPWAI6H_CM5aQciiJRoJcYYCaY2autjKgWocML8BXXi33PfJ7o6cQoaG0eAw5oBWoOWPthrGoxh321R91LHVIPeQCBMUel9kcPnm4OaBp347Cbo9BhfcN4MEw6btDSnGzqsHnhCwp4679Ro2JsDSmngx5eYBHw6ptGSYCTJaE6ob06NfvhA6nog7blJRm2mN2YdyAxlHCG6OgGE21c2BaiJkMKnWQfW2IEDJBILIca_RnOYe87QLzaCrnSQ7xKOMNQgfOgjQnPHvMRLLphgU_eetKkZIzmQwDXgZ2buP8HFBXcvP24DZdfwVG9bpgKwDSmZZ_PEZ9qzxoHe4-WElXTFtXWw84SSyFlfAUdp7Rj9j28zxQU4S6i4N2Pqf7568KYKoSAQYSEm6lKOE-VnsMcEKZVESMVdZOX4aIXCY9HQxYnFtVJfw35RSeknmQlVG5CYJsgEnyjwfGUSwbwbjkiVcSkZJgv8813Ug4SVdGLgTnnvQmoj44qg351MjkeFcaqz3vZ6kqVQVrH3yY3UpVBUXkHwKGpOEk46ZRF02yUZkgktdObVAud9uXVSOFD0Zz4X8Fdb1vsLj6kvHKocrr9g-jvvZedm_Y1ubjqYw-7n7oIOqZhJ7n8wjjDEjUY_nhlrkVK8Q30pvGgejjYGM5H_Odk-YG3QdrBwtqmOtX-JKdILioWrxwuojHvxDrV78siF10L1BdfbAo",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-document-referer":
          "https://www.temu.com/kr/channel/lightning-deals.html?_x_channel_src=1&jump_from_goods=true&_x_channel_scene=spike&refer_page_el_sn=201375&_x_vst_scene=adg&_x_ads_channel=google&_x_ads_sub_channel=search&_x_ads_account=4571995958&_x_ads_set=20871119964&_x_ads_id=159849865391&_x_ads_creative_id=685202691053&_x_ns_source=g&_x_ns_gclid=CjwKCAjwiaa2BhAiEiwAQBgyHrhuU5eEpamYws3zvI2Tc8gqCI46PDbyrJEb-K4WXCSNrceqpdUFCBoCRDoQAvD_BwE&_x_ns_placement=&_x_ns_match_type=e&_x_ns_ad_position=&_x_ns_product_id=&_x_ns_target=&_x_ns_devicemodel=&_x_ns_wbraid=Cj4KCAjw5qC2BhB6Ei4A2Ut3R1sqxj9y3LWN0uV7xzrPCM26le90EUYdxyVKYMZ1BHVsE8KcJ7bbFfcdGgLLnQ&_x_ns_gbraid=0AAAAAo4mICECcn-tTEH6TC55NDhAuEc2f&_x_ns_keyword=%ED%85%8C%EB%AC%B4&_x_ns_targetid=kwd-924281899843&_x_ns_extensionid=&refer_page_name=home&refer_page_id=10005_1724486082325_nba2fndwi3&refer_page_sn=10005&_x_sessn_id=aanibuvhxu&is_back=1",
        cookie:
          "region=185; language=ko; currency=KRW; api_uid=CmzAHWbJenJOXgBXJTmhAg==; timezone=Asia%2FSeoul; webp=1; _nano_fp=Xpmxn0TJX0ganpXynT_Inf2OIw4BpA7VO6tlw1bR; _bee=yOW1izlIJWhTDHteQFStu6dpB7wREdOv; njrpl=yOW1izlIJWhTDHteQFStu6dpB7wREdOv; dilx=kuFzbpicKpKolBNR6PIXO; hfsc=L3yIfI046T/52pfNfg==; _ttc=3.lNz9Hb8dWyoJ.1756022085; __cf_bm=R8szg.anDu7tsn.68z1tsNm8tjenfhimHshkcbSbAAk-1724486470-1.0.1.1-2IlRb6KAEVKjIQYeTLAd8tHp30NxB_zkdSu5wTAfuXM4lIamNLjSjtw7Qy2QCr_Z5Y.mhlpALplwr87nI34RLA",
        Referer:
          "https://www.temu.com/kr/1pc-by--%EC%8B%9C%EA%B3%84-%EB%82%A8%EC%84%B1%EC%9A%A9-%ED%81%AC%EB%A1%9C%EB%85%B8%EA%B7%B8%EB%9E%98%ED%94%84-%EB%82%A8%EC%84%B1%EC%9A%A9-%EC%8B%9C%EA%B3%84-%EC%95%84%EB%82%A0%EB%A1%9C%EA%B7%B8-%EC%BF%BC%EC%B8%A0-%EC%9A%B4%EB%8F%99-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%A6%AC%EC%8B%9C-%EC%8A%A4%ED%8F%AC%EC%B8%A0-%EB%94%94%EC%9E%90%EC%9D%B4%EB%84%88-%EC%86%90%EB%AA%A9-%EC%8B%9C%EA%B3%84-30m-%EB%B0%A9%EC%88%98-%EC%9A%B0%EC%95%84%ED%95%9C-%EC%95%84%EB%B2%84%EC%A7%80%EC%9D%98-%EB%82%A0-%EC%84%A0%EB%AC%BC-g-601099518587303.html?_oak_mp_inf=EKfjnpqm1ogBGhZmbGFzaF9zYWxlX2xpc3RfczByY3o2IK%2FDhpuYMg%3D%3D&top_gallery_url=https%3A%2F%2Fimg.kwcdn.com%2Fproduct%2FFancyalgo%2FVirtualModelMatting%2F4b45bc8eaa7fae1c689ec03b6b258fcf.jpg&spec_gallery_id=2006033865&refer_page_sn=10132&refer_source=0&freesia_scene=116&_oak_freesia_scene=116&_oak_rec_ext_1=MjQ3MDU&_oak_gallery_order=1282936305%2C787316047%2C412179608%2C1252242708%2C1698546174&refer_page_el_sn=201401&_x_channel_src=1&_x_channel_scene=spike&_x_vst_scene=adg&_x_ads_channel=google&_x_ads_sub_channel=search&_x_ads_account=4571995958&_x_ads_set=20871119964&_x_ads_id=159849865391&_x_ads_creative_id=685202691053&_x_ns_source=g&_x_ns_gclid=CjwKCAjwiaa2BhAiEiwAQBgyHrhuU5eEpamYws3zvI2Tc8gqCI46PDbyrJEb-K4WXCSNrceqpdUFCBoCRDoQAvD_BwE&_x_ns_placement=&_x_ns_match_type=e&_x_ns_ad_position=&_x_ns_product_id=&_x_ns_target=&_x_ns_devicemodel=&_x_ns_wbraid=Cj4KCAjw5qC2BhB6Ei4A2Ut3R1sqxj9y3LWN0uV7xzrPCM26le90EUYdxyVKYMZ1BHVsE8KcJ7bbFfcdGgLLnQ&_x_ns_gbraid=0AAAAAo4mICECcn-tTEH6TC55NDhAuEc2f&_x_ns_keyword=%ED%85%8C%EB%AC%B4&_x_ns_targetid=kwd-924281899843&_x_ns_extensionid=&_x_sessn_id=aanibuvhxu&refer_page_name=lightning-deals&refer_page_id=10132_1724486097820_bdzczrgghb",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  ).then((res) => console.log(res.status));
}

// crawl_temu("1");

// function getDivs() {
//   fs.readFile("./text2.html", "utf8", (err, data) => {
//     // console.log(data);

//     const $ = cheerio.load(data);

//     const element = $(".home-container")
//       .removeAttr("data-first-retail-purchaser")
//       .removeAttr("data-register-rocket-pay")
//       .removeAttr("data-register-pay-method-url")
//       .removeAttr("data-is-payment-failure-on-hold-member")
//       .removeAttr("data-is-add-card")
//       .removeAttr("data-is-agreement-registered")
//       .removeAttr("data-eats-confidential-info-update")
//       .removeAttr("data-eats-benefit-duration")
//       .removeAttr("data-source-app")
//       .removeAttr("data-loyalty-fee")
//       .removeAttr("data-fee-change-cancel-ab-group-p15")
//       .removeAttr("data-next-recurring-date")
//       .removeAttr("data-rejoin")
//       .parent();

//     const result = element.html();

//     fs.writeFile("./text3.html", result || "", (err) => {
//       if (err) console.log("Error: ", err);
//       else console.log("File created");
//     });

//     // console.log(element);
//   });
// }

// getDivs();

crawl_coupang("1357034912");
