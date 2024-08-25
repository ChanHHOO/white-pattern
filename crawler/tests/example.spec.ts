import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(
    "https://www.temu.com/goods.html?_bg_fs=1&goods_id=601099548872874&refer_page_el_sn=200024&_x_channel_src=1&_x_channel_scene=spike&_x_vst_scene=adg&_x_ads_channel=google&_x_ads_sub_channel=search&_x_ads_account=4571995958&_x_ads_set=20871119964&_x_ads_id=159849865391&_x_ads_creative_id=685202691053&_x_ns_source=g&_x_ns_gclid=CjwKCAjwiaa2BhAiEiwAQBgyHrhuU5eEpamYws3zvI2Tc8gqCI46PDbyrJEb-K4WXCSNrceqpdUFCBoCRDoQAvD_BwE&_x_ns_placement=&_x_ns_match_type=e&_x_ns_ad_position=&_x_ns_product_id=&_x_ns_target=&_x_ns_devicemodel=&_x_ns_wbraid=Cj4KCAjw5qC2BhB6Ei4A2Ut3R1sqxj9y3LWN0uV7xzrPCM26le90EUYdxyVKYMZ1BHVsE8KcJ7bbFfcdGgLLnQ&_x_ns_gbraid=0AAAAAo4mICECcn-tTEH6TC55NDhAuEc2f&_x_ns_keyword=%ED%85%8C%EB%AC%B4&_x_ns_targetid=kwd-924281899843&_x_ns_extensionid=&_x_sessn_id=aanibuvhxu&refer_page_name=home&refer_page_id=10005_1724487851762_fl4phgdfhy&refer_page_sn=10005"
  );

  const span = await page.getByText("전체 리뷰 보기");

  console.log(span.click());

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
