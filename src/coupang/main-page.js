console.log('js script loaded');

onLoad(function () {
  console.log('onLoaded');
  
  var domChanger = new DomChanger(SITE.COUPANG);
  domChanger.run(PAGE.MAIN);
});