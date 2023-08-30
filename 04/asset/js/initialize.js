/*=================================================
모바일 체크 (결제등의 이유로 기기가 모바일인지 체크)
=================================================*/
var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

isMobile.any() && document.getElementsByTagName('html')[0].classList.add("mobile");

/*=================================================
  브라우저체크
 =================================================*/
var browserCheck = function(){
  // 브라우저 및 버전을 구하기 위한 변수들.
  'use strict';
  var agent = navigator.userAgent.toLowerCase(),
    name = navigator.appName,
    browser = {
      "name": "",
      "version": "",
      "fullName": "",
    };

  // MS 계열 브라우저를 구분하기 위함.
  if (name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
    browser.name = 'ie';
    if (name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
      agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
      browser.version = parseInt(agent[1]);
    } else { // IE 11+
      if (agent.indexOf('trident') > -1) { // IE 11
        browser.version = 11;
      } else if (agent.indexOf('edge/') > -1) { // Edge
        browser.fullName = 'edge';
      }
    }
    browser.fullName = browser.name + "_" + browser.version;

  } else if (agent.indexOf('safari') > -1) { // Chrome or Safari
    if (agent.indexOf('opr') > -1) { // Opera
      browser.fullName = 'opera';
    } else if (agent.indexOf('chrome') > -1 || agent.indexOf('crios') > -1) { // Chrome
      browser.fullName = 'chrome';
    } else { // Safari
      browser.fullName = 'safari';
    }

  } else if (agent.indexOf('firefox') > -1) { // Firefox
    browser.fullName = 'firefox';
  }
  return browser;
};
var browser = browserCheck();
var browserName = browser.fullName;

browser.fullName && document.getElementsByTagName('html')[0].classList.add(browser.fullName);

/*=================================================
  팝업
 =================================================*/
var clickEv = isMobile.any() ? "touchend" : "click";

document.addEventListener(clickEv, function(e){
  var target = e.target;
  var parent = target.parentNode;

  if (!target.className || parent == document) return;

  if (target.classList.contains("closePopupBtn")) {
    e.preventDefault();
    parent.parentNode.parentNode.removeChild(parent.parentNode);
  } else if (parent.classList.contains("closePopupBtn")) {
    // icon 선택시
    e.preventDefault();
    parent.parentNode.parentNode.parentNode.removeChild(parent.parentNode.parentNode);
  } else if (target.classList.contains("closePopupTodayBtn")) {
    e.preventDefault();
    parent.parentNode.parentNode.removeChild(parent.parentNode);
    set_cookie(parent.parentNode.id,"hide", 1 * 60 * 60 * 24);
  } else if (parent.classList.contains("closePopupTodayBtn")) {
    // icon 선택시
    e.preventDefault();
    parent.parentNode.parentNode.parentNode.removeChild(parent.parentNode.parentNode);
    set_cookie(parent.parentNode.parentNode.id,"hide", 1 * 60 * 60 * 24);
  }
});

/*=================================================
 미디어 쿼리 셋팅
 =================================================*/
var mediaQuery = {
  sm: 544,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

/*=================================================
 언어 체크 셋팅
 =================================================*/
var langCheck = function () {
  langCheck = document.getElementsByTagName('html')[0].getAttribute('data-lang');
  if (!langCheck) langCheck = 'ko';
  return langCheck;
}
var langCheck = langCheck();

/*=================================================
 addEventListener passive 지원여부 판별
 =================================================*/
 var hasPassive = function() {
  var supportsPassiveOption = false;
  try {
    addEventListener("test", null, 
      Object.defineProperty({}, "passive", {
        get: function() {
          supportsPassiveOption = true;
        }
      })
    );
  } catch (e) {}
  return supportsPassiveOption;
}