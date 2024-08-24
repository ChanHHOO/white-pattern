console.log('coupang.js script loaded');

onLoad(function () {
  console.log('onLoaded');

  var domChanger = new DomChanger();

  domChanger.preserveStructurePath = [
    ["#container"],
    ["#full-gnb-header"],
    ["#header"],
    ["section"],
    [".logo", ".search-form.product-search.clearFix", ".icon-menus"]
  ];

  domChanger.updateElementStyles = [
    ["#header", {
      height: "1007px"
    }]
  ]

  domChanger.run();
});