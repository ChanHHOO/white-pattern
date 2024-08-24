console.log('js script loaded');

onLoad(function () {
  console.log('onLoaded');

  var domChanger = new DomChanger();

  // domChanger.preserveStructurePath = [
  //   "#container",
  //   "#full-gnb-header",
  //   "#header",
  //   "section",
  //   [".logo", ".search-form.product-search.clearFix", ".icon-menus"]
  // ];

  domChanger.updateElementStyles = [
    ["#header", { height: "1007px" }],
    [".top-bar", { display: "none !important;" }],
    ["div.gnb-menu-container", { display: "none !important;" }],
    ["div.category-btn", { display: "none !important;" }],
    ["#coupang-banner", { display: "none !important;" }],
    ["#todaysHot", { display: "none !important;" }],
    ["#contents", { display: "none !important;" }],
    ["#footer", { display: "none !important;" }],
  ]

  domChanger.run();
});