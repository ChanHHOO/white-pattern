console.log('js script loaded');

onLoad(function () {
  console.log('onLoaded');

  var domChanger = new DomChanger();

  domChanger.preserveStructurePath = [
    ["#container"],
    ["#contents"],
    ["#searchOptionForm"],
  ];

  domChanger.updateElementStyles = [
    ["#srp-bottom-carousel-dco-contaner", { display: "none !important;" }],
    ["#srpKeywordProductTopBanner", { display: "none !important;" }],
    [".sdw-aging", { display: "none !important;" }],
  ]
  // domChanger.removeElements = [
  //   "#srp-bottom-carousel-dco-contaner",
  //   "#srpKeywordProductTopBanner",
  //   ".sdw-aging",
  // ];
  domChanger.run();
});
