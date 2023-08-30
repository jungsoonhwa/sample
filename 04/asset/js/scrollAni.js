(function (root, factory) {
  root.scrollAni = factory();
})(this, function () {
  function ScrollAni() {
    // gsap, ScrollTrigger 라이브러리 항상 먼저 로드되어 있어야 함
    gsap.registerPlugin(ScrollTrigger);
  }
  
  ScrollAni.prototype.init = function () {
    var self = this;
    var scrollItems = document.querySelectorAll("[data-scrollani]");

    Array.prototype.slice.call(scrollItems).forEach(function(el){
      self[el.getAttribute("data-scrollani")](el);
    })
  }

  ScrollAni.prototype.slideUp = function (element, delay) {
    element.setAttribute('data-scrollani', 'slideUp');

    var aniDelay = delay || element.getAttribute("data-scrollani-delay") || '0';

    var slideUp = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 0%",
        toggleActions: "play none none reverse",
      }
    });
    slideUp.to(element, { opacity: "1", y: "0", delay: aniDelay, ease: "power1.out" } );
  }

  ScrollAni.prototype.slideDown = function (element, delay) {
    element.setAttribute('data-scrollani', 'slideDown');

    var aniDelay = delay || element.getAttribute("data-scrollani-delay") || '0';

    var slideDown = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 0%",
        toggleActions: "play none none reverse",
      }
    });
    slideDown.to(element, { opacity: "1", y: "0", delay: aniDelay, ease: "power1.inOut" });
  }

  ScrollAni.prototype.scaleUp = function (element, delay) {
    element.setAttribute('data-scrollani', 'scaleUp');

    var aniDelay = delay || element.getAttribute("data-scrollani-delay") || '0';

    var scaleUp = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 0%",
        toggleActions: "play none none reverse",
      }
    });
    scaleUp.to(element, { opacity: "1", scale: "1.1", delay: aniDelay, ease: "power1.inOut" });
  }

  ScrollAni.prototype.scaleDown = function (element, delay) {
    element.setAttribute('data-scrollani', 'scaleDown');

    var aniDelay = delay || element.getAttribute("data-scrollani-delay") || '0';

    var scaleDown = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 0%",
        toggleActions: "play none none reverse",
      }
    });
    scaleDown.to(element, { scale: "1", delay: aniDelay, ease: "power1.inOut" });
  }

  ScrollAni.prototype.fadeIn = function (element, delay) {
    element.setAttribute('data-scrollani', 'fadeIn');

    var aniDelay = delay || element.getAttribute("data-scrollani-delay") || '0';

    var fadeIn = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 0%",
        toggleActions: "play none none reverse",
      }
    });
    fadeIn.to(element, { opacity: "1", delay: aniDelay, ease: "power1.inOut" });
  }

  ScrollAni.prototype.fadeOut = function (element, delay) {
    element.setAttribute('data-scrollani', 'fadeOut');

    var aniDelay = delay || element.getAttribute("data-scrollani-delay") || '0';

    var fadeOut = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 0%",
        toggleActions: "play none none reverse",
      }
    });
    fadeOut.to(element, { opacity: "0", delay: aniDelay, ease: "power1.inOut" });
  }

  ScrollAni.prototype.leftToRight = function (element, delay) {
    element.setAttribute('data-scrollani', 'leftToRight');

    var aniDelay = delay || element.getAttribute("data-scrollani-delay") || '0';

    var leftToRight = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 0%",
        toggleActions: "play none none reverse",
      }
    });
    leftToRight.to(element, { opacity: "1", x: "0", delay: aniDelay, ease: "power1.inOut" } );
  }

  ScrollAni.prototype.rightToLeft = function (element, delay) {
    element.setAttribute('data-scrollani', 'rightToLeft');

    var aniDelay = delay || element.getAttribute("data-scrollani-delay") || '0';

    var rightToLeft = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 0%",
        toggleActions: "play none none reverse",
      }
    });
    rightToLeft.to(element, { opacity: "1", x: "0", delay: aniDelay, ease: "power1.inOut" } );
  }

  ScrollAni.prototype.toggleClass = function (element, delay) {
    element.setAttribute('data-scrollani', 'toggleClass');

    ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      // end: "bottom 0%",
      endTrigger : "body",
      toggleActions: "play none none reverse",
      toggleClass: {targets: element, className: "aniOn"},
    });
  }

  var _scrollAni = null;
  return {
    getInstance: function() {
      // scrollAni를 처음 사용하는 시점에 ScrollAni객체를 만들기 위해 싱글톤 패턴 적용
      if (_scrollAni === null) {
        _scrollAni = new ScrollAni();
      }
      return _scrollAni;
    }
  }
});
