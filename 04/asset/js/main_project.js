document.addEventListener('DOMContentLoaded', function() {
  /* pc 마우스 움직임 효과  */
  const $movingImg = $('.pc-project-wrap');
  
  function parallaxIt(e, target, movement) {
    var $this = $(".secProjectAnim");
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;

    TweenMax.to(target, 1,{
        x: (relX - $this.width() / 2) / $this.width() * movement,
        y: (relY - $this.height() / 2) / $this.height() * movement 
    });
  }
  
  
  $(window).resize(function () { // resize 이벤트 발생할 때 마다 실행되는 함수
    if (window.innerWidth >= 992) {
      $(".secProjectAnim").mousemove(function (e) {
          parallaxIt(e, $movingImg, -40);
      });
    }
  }).resize();

})
