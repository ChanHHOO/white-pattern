console.log('js script loaded');

onLoad(function () {
  console.log('onLoaded');

  var domChanger = new DomChanger();

  domChanger.preserveStructurePath = [
    ["#container"],
    ["#contents"],
    [".prod-atf"],
  ]; 
  domChanger.updateElementStyles = [
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
  ]
  domChanger.run();
});
