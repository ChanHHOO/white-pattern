// const { chromium } = require("playwright"); // Or 'chromium' or 'webkit'.
import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    extraHTTPHeaders: {
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
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "service-worker-navigation-preload": "2",
      "upgrade-insecure-requests": "1",
      // cookie:
      //   "region=185; language=ko; currency=KRW; api_uid=CmzAHWbJenJOXgBXJTmhAg==; timezone=Asia%2FSeoul; webp=1; _nano_fp=Xpmxn0TJX0ganpXynT_Inf2OIw4BpA7VO6tlw1bR; _bee=yOW1izlIJWhTDHteQFStu6dpB7wREdOv; njrpl=yOW1izlIJWhTDHteQFStu6dpB7wREdOv; dilx=kuFzbpicKpKolBNR6PIXO; hfsc=L3yIfI046T/52pfNfg==; _ttc=3.lNz9Hb8dWyoJ.1756022085; verifyAuthToken=y4nrl8R6qbOBBQyhq8MbDQ8b3f2dc7a6e1d8308; __cf_bm=xNtGAboskbWndJYu1jt1L7CPlPjgyDUNbEbxHqy8fuo-1724487839-1.0.1.1-AgXj9ia2Uy63NU1m1TRiqDJn_9dOORmfmQmK6pkeTbuJcPifIAluZj07w6QB4glc1NVMz9ZiLY1G4aTc21KB5g",
    },
  });

  const page = await context.newPage();
  await page.goto("https://www.temu.com/goods.html?&goods_id=601099548872874");

  const element = await page.getByText("전체 리뷰 보기");

  console.log(element);

  const title = await page.title();

  console.log(title);
  // await browser.close();
})();

fetch(
  "https://www.temu.com/mx/cinta-metrica-de-acero-fluorescente-de-bloqueo-automatico-regla-de-caja-de-codigo-de-inyeccion-laser-de-alta-precision-herramienta-de-medicion-regla-ancha-1-ud-g-601099526475107.html?_oak_mp_inf=EOOagJ6m1ogBGhZnb29kc190cjk5MnNfcmVjb21tZW5kIIig69TpMQ%3D%3D&top_gallery_url=https%3A%2F%2Fimg.kwcdn.com%2Fproduct%2FFancyalgo%2FVirtualModelMatting%2F6e487a61853277a9eec03c8a4c41ece7.jpg&spec_gallery_id=2044871440&refer_page_sn=10017&refer_source=10016&freesia_scene=11&_oak_freesia_scene=11&_oak_rec_ext_1=NjYyNA&refer_page_el_sn=200444&refer_page_name=bgn_verification&refer_page_id=10017_1711998843014_6qimmw4kwa&_x_channel_scene=spike&_x_channel_src=1&_x_sessn_id=sy8wy9wr8c",
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
      "sec-ch-ua-model": '""',
      "sec-ch-ua-platform": '"macOS"',
      "sec-ch-ua-platform-version": '"14.5.0"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "service-worker-navigation-preload": "2",
      "upgrade-insecure-requests": "1",
      cookie:
        "region=185; language=ko; currency=KRW; api_uid=CmzAHWbJenJOXgBXJTmhAg==; timezone=Asia%2FSeoul; webp=1; _nano_fp=Xpmxn0TJX0ganpXynT_Inf2OIw4BpA7VO6tlw1bR; dilx=kuFzbpicKpKolBNR6PIXO; _ttc=3.lNz9Hb8dWyoJ.1756022085; verifyAuthToken=8hSfai_hJoMoKN6Sra-_WA6b334f226d41182bb; __cf_bm=JXtwOjrQhf2XISoGrR3_J7HXWSEwGkHAxkmGFY.9DDA-1724489336-1.0.1.1-pDtduNU.LC0LDSpWa5GHdAPfstVyi45J_dn7XOFTtw3Xak2IacWH0pAkR3GHclpA3FvEwQzdEk4dV77aZsC7DQ; _bee=yOW1izlIJWhTDHteQFStu6dpB7wREdOv; njrpl=yOW1izlIJWhTDHteQFStu6dpB7wREdOv; hfsc=L3yIfI046T/52pfNfg==",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
  }
);
