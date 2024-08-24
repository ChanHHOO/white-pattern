
const commonPages = [
  ["#todaysHot", { display: "none !important;" }],
  [".top-bar", { display: "none !important;" }],
  ["div.gnb-menu-container", { display: "none !important;" }],
  ["div.category-btn", { display: "none !important;" }],
  ["#coupang-banner", { display: "none !important;" }],
  ["#footer", { display: "none !important;" }],  
]
const commonContensts = [
  ["#sdp-mid-banner-btf", { display: "none !important;" }],
  ["#promotionCarousel", { display: "none !important;" }],
  ["#welcomebackNudage", { display: "none !important;" }],
  ["#searchCarouselWidget", { display: "none !important;" }],
  ["#searchAlsoViewedProducts", { display: "none !important;" }],
  ["div.recommendation", { display: "none !important;" }],
  ["div#sdpAdsBottom", { display: "none !important;" }],
  ["div#promotionCarousel", { display: "none !important;" }],
  ["div#midCarousel", { display: "none !important;" }],
  ["div#midCarousel1", { display: "none !important;" }],
  ["div#midCarousel2", { display: "none !important;" }],
  ["div#midCarousel3", { display: "none !important;" }],
  ["div#midCarousel4", { display: "none !important;" }],
  ["div#prod-detail-recommend", { display: "none !important;" }],
  ["div.sdp-also-viewed-products-widget", { display: "none !important;" }],
  ["div#peopleAlsoBought", { display: "none !important;" }],
  ["div#sdpBottomAds", { display: "none !important;" }],
  ["div#sdp-bottom-banner", { display: "none !important;" }],
  [".srp-top-banner-container", { display: "none !important;" }],
  ["#srp-bottom-carousel-dco-contaner", { display: "none !important;" }],
  ["#srpKeywordProductTopBanner", { display: "none !important;" }],
  [".sdw-aging", { display: "none !important;" }],
]

const MOCK_MAIN = [
  ...commonPages,
  ["#header", { height: "1007px" }],
  ["#contents", { display: "none !important;" }],
]

const MOCK_SEARCH = [
  ...commonPages,
  ...commonContensts,
]

const MOCK_PRODUCT = [
  ...commonPages,
  ...commonContensts,
]