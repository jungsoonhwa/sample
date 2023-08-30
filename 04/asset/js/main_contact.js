$('document').ready(function(){
  var lottieItem = bodymovin.loadAnimation({
    container: document.getElementById('lottieItem1'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: `/views/res/lottie/main-motion-02.json`,
  })
  var lottieItem = bodymovin.loadAnimation({
    container: document.getElementById('lottieItem2'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: `/views/res/lottie/main-motion-01.json`,
  })
  
})