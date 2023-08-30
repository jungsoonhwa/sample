(function (root, factory) {
  root.asyncLoader = factory();
})(this, function () {

  var contentsData = {
    colorpicker: {
      res: [
        { id: "_al_colorpicker", tag: "script", path: window.gReconers.VIEWURL + "res/lib/default/jqColorPicker/jqColorPicker.min.js" }
      ],
      isLoaded: function () {
        return jQuery().colorPicker ? true : false;
      }
    },
    ckeditor: {
      res: [
        { id: "_al_ckeditor_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/default/ckeditor/ckeditor.js" },
      ],
      isLoaded: function () {
        return typeof CKEDITOR === "undefined" ? false : true;
      }
    },
    datetimepicker: {
      res: [
        { id: "_al_datetimepicker_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/custom/datetimepicker/jquery.datetimepicker.full.min.js" },
        { id: "_al_datetimepicker_css", tag: "link", position: { selector: "#baseCss", type: "insertBefore" }, path: window.gReconers.VIEWURL + "res/lib/custom/datetimepicker/jquery.datetimepicker.min.css" }
      ],
      isLoaded: function () {
        return jQuery().datetimepicker ? true : false;
      }
    },
    fileattach: {
      res: [
        { id: "_al_fileattach_js", tag: "script", path: window.gReconers.VIEWURL + "res/js/utils/fileAttach.js" },
      ],
      isLoaded: function () {
        return typeof fileAttach === "undefined" ? false : true;
      }
    },
    selectize: {
      res: [
        { id: "_al_selectize_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/default/selectize/selectize.min.js" },
        { id: "_al_selectize_css", tag: "link", position: { selector: "#baseCss", type: "insertBefore" }, path: window.gReconers.VIEWURL + "res/lib/default/selectize/selectize.default.css" }
      ],
      isLoaded: function () {
        return jQuery().selectize ? true : false ;
      }
    },
    select2: {
      res: [
        { id: "_al_select2_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/custom/select2/js/select2.min.js" },
      ],
      isLoaded: function () {
        return jQuery().select2 ? true : false ;
      }
    },
    sly: {
      res: [
        { id: "_al_sly_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/custom/sly/sly.min.js" },
      ],
      isLoaded: function () {
        return jQuery().sly ? true : false ;
      }
    },
    fancybox: {
      res: [
        { id: "_al_fancybox_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/default/fancybox/jquery.fancybox.pack.js" },
        { id: "_al_fancybox_css", tag: "link", position: { selector: "#baseCss", type: "insertBefore" }, path: window.gReconers.VIEWURL + "res/lib/default/fancybox/jquery.fancybox.css" }
      ],
      isLoaded: function () {
        return jQuery().fancybox ? true : false;
      }
    },
    slick: {
      res: [
        { id: "_al_slick_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/default/slick/slick.min.js" },
        { id: "_al_slick_css", tag: "link", position: { selector: "#baseCss", type: "insertBefore" }, path: window.gReconers.VIEWURL + "res/lib/default/slick/slick.css" }
      ],
      isLoaded: function () {
        return jQuery().slick ? true : false ;
      }
    },
    swiper: {
      res: [
        { id: "_al_swiper_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/default/swiper/swiper.min.js" },
        { id: "_al_swiper_css", tag: "link", position: { selector: "#baseCss", type: "insertBefore" }, path: window.gReconers.VIEWURL + "res/lib/default/swiper/swiper.min.css" }
      ],
      isLoaded: function () {
        return  typeof Swiper === "undefined" ? false : true;
      }
    },
    dotdotdot: {
      res: [
        { id: "_al_dotdotdot_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/default/dotdotdot/jquery.dotdotdot.min.js" }
      ],
      isLoaded: function () {
        return jQuery().dotdotdot ? true : false;
      }
    },
    blockui: {
      res: [
        { id: "_al_blockui_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/default/blockui/jquery.blockui.min.js" }
      ],
      isLoaded: function () {
        return jQuery().block ? true : false;
      }
    },
    scrollTrigger: {
      res: [
        { id: "_al_scrollTrigger_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/default/scrolltrigger/gsap3.6.0/scrolltrigger.min.js" },
        { id: "_al_scrollTrigger_gsap_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/default/scrolltrigger/gsap3.6.0/gsap.min.js" },
        { id: "_al_scrollTrigger_scrollAni_js", tag: "script", path: window.gReconers.VIEWURL + "res/js/utils/scrollAni.js" },
      ],
      isLoaded: function () {
        return typeof ScrollTrigger === "undefined" ? false : true;
      }
    },
    anime: {
      res: [
        { id: "_al_anime_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/custom/anime/anime.min.js" },
      ],
      isLoaded: function () {
        return jQuery().anime ? true : false ;
      }
    },
    BlockRevealers: {
      res: [
        { id: "_al_BlockRevealers_js", tag: "script", path: window.gReconers.VIEWURL + "res/lib/custom/BlockRevealers/main.js" },
      ],
      isLoaded: function () {
        return jQuery().BlockRevealers ? true : false ;
      }
    },
    smoothscroll: {
      res: [
        { id: "_al_smoothScroll_js", tag: "script", position: { selector: "body", type: "appendChild" }, path: window.gReconers.VIEWURL + "res/lib/custom/SmoothScroll/smoothScroll.js" }
      ],
      isLoaded: function () {
        return typeof SmoothScroll === "undefined" ? false : true;
      }
    },
    kakaoapi: {
      res: [
        { id: "_al_kakaoapi_js", tag: "script", path: "//developers.kakao.com/sdk/js/kakao.min.js" }
      ],
      isLoaded: function () {
        return typeof Kakao === "undefined" ? false : true;
      }
    },
    facebookapi: {
      res: [{
        id: "_al_facebookapi_js",
        tag: "script",
        path: "//connect.facebook.net/en_US/sdk.js"
      }],
      isLoaded: function () {
        return typeof FB === "undefined" ? false : true;
      }
    },
    blockFactory: {
      res: [
        { id: "_al_handlebar_js", tag: "script", position: { selector: "body", type: "appendChild" }, path: window.gReconers.VIEWURL + "res/lib/custom/handlebars/handlebars-v4.1.1.js" },
        { id: "_al_handlebar_helper_js", tag: "script", position: { selector: "body", type: "appendChild" }, path: window.gReconers.VIEWURL + "res/js/utils/handlebarsHelper.js" },
        { id: "_al_handlebar_blockFactory_js", tag: "script", position: { selector: "body", type: "appendChild" }, path: window.gReconers.VIEWURL + "res/js/utils/blockFactory.js" }
      ],
      sync: true,
      isLoaded: function () {
        return typeof BlockFactory === "undefined" ? false : true;
      }
    },
    multitable: {
      res: [
        { id: "_al_multitable_js", tag: "script", position: { selector: "body", type: "appendChild" }, path: window.gReconers.VIEWURL + "res/js/utils/multiTable/multiTable.js" }
      ],
      isLoaded: function () {
        return jQuery().multiTable ? true : false;
      }
    },
    loadimage: {
      res: [
        { id: "_al_loadimage_js", tag: "script", position: { selector: "body", type: "appendChild" }, path: window.gReconers.VIEWURL + "res/lib/default/load-image/load-image.all.min.js" }
      ],
      isLoaded: function () {
        return jQuery().multiTable ? true : false;
      }
    },
    fullcalendar: {
      res: [
        { id: "_al_fullcalendar_js", tag: "script", position: { selector: "body", type: "appendChild" }, path: window.gReconers.VIEWURL + "/res/lib/custom/fullcalendar/main.js" },
        { id: "_al_fullcalendar_css", tag: "link", position: { selector: "#baseCss", type: "insertBefore" }, path: window.gReconers.VIEWURL + "/res/lib/custom/fullcalendar/main.css" }
      ],
      isLoaded: function () {
        return typeof FullCalendar === "undefined" ? false : true;
      }
    },
    fullcalendar_lang_ko: {
      res: [
        { id: "_al_fullcalendar_lang_ko_js", tag: "script", position: { selector: "body", type: "appendChild" }, path: window.gReconers.VIEWURL + "/res/lib/custom/fullcalendar/locales/ko.js" },
      ],
      isLoaded: function () {
        return FullCalendar.globalLocales.filter(function(a) { return a.code=="ko"}).length;
      }
    },
    moreHandle: {
      res: [
        { id: "_al_moreHandle_js", tag: "script", position: { selector: "body", type: "appendChild" }, path: window.gReconers.VIEWURL + "res/js/utils/moreHandle.js" }
      ],
      isLoaded: function () {
        return typeof $.fn.moreHandle === "undefined" ? false : true;
      }
    },
    vue: {
      res: [{
        id: "_al_vue_js",
        tag: "script",
        path: "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"
      }],
      isLoaded: function () {
        return typeof window.Vue === "undefined" ? false : true;
      }
    },
  };

  function AsyncLoader() { 
    this.workerList = {};
  }

  AsyncLoader.prototype.load = function (src, opts, cb) {
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    opts = opts || {};
    cb = cb || function () { }

    if (contentsData[src]) {
      // 배열에 ID 값
      if (contentsData[src].isLoaded()) {
        cb();
      } else {
        // 해당 리소스의 worker이미 생성되었다면
        // callback 만 추가해준다.
        if (!contentsData[src].worker) {
          contentsData[src].worker = new Worker(contentsData[src], cb);
        } else {
          contentsData[src].worker.addCallback(cb);
        }
      }
    } else {
      // 일반 src 
      var worker = new Worker({
        res: [{ id: opts.id, tag: opts.tag || "script", position: opts.position, path: src }]
      }, cb);
    }
  }

  function Worker(data, callback) {
    // var self = this;

    this.data = data;
    this.callbackList = [];
    this.totalResCount = 0;
    this.loadedCount = 0;

    this.callbackList.push(callback);
    
    if (this.data.res) {
      this.totalResCount = this.data.res.length;
      for (var i=0; i<this.totalResCount; i++) {
        var obj = this.data.res[i];

        if (!document.getElementById(obj.id)) {
          this.appendElement(obj, i);

          if (this.data.sync) {
            break;
          }

        } else {
          this.loadedCount++;
        }
      }
    }
    

    if (this.loadedCount === this.totalResCount) {
      // 이미 load 됨.
      this.callUserCallback();
    }
  }

  // callback함수 추가
  Worker.prototype.addCallback = function (callback) {
    this.callbackList.push(callback);
  }

  // load 완료후 사용자 callback 호출
  Worker.prototype.callUserCallback = function () {
    if (this.callbackList.length > 0) {
      this.callbackList.forEach(function (callback) {
        callback();
      });
    }
  }

  Worker.prototype.stdOnEnd = function(element, cb, index) {
    var index = index;
    element.onload = function () {
      this.onerror = this.onload = null;
      cb(null, index);
    }
    element.onerror = function () {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null
      cb(new Error('Failed to load ' + this.src), index)
    }
  }

  // DOM resource 스크립트 추가
  Worker.prototype.appendElement = function (opts, index) {
    var elPosition = null, position = opts.position || { selector: "head", type: "appendChild" };
    var type = opts.tag;
    var elem = document.createElement(type);
    var listener =  this.listener.bind(this);

    if (opts.id) {
      elem.id = opts.id;
    }

    if (type === "link") {
      elem.rel = 'stylesheet';
      elem.href = opts.path;
    } else if (type === "script") {
      elem.type = 'text/javascript';
      elem.charset = 'utf8';
      elem.async = true;
      elem.src = opts.path + window.gReconers.cssAndJsCache;
    }

    if ('onload' in elem) {
      this.stdOnEnd(elem, listener, index);
    } else {
      this.ieOnEnd(elem, listener, index);
    }

    // some good legacy browsers (firefox) fail the 'in' detection above
    // so as a fallback we always set onload
    // old IE will ignore this and new IE will set onload
    if (!elem.onload) {
      this.stdOnEnd(elem, listener, index);
    }

    elPosition = document.querySelector(position.selector);
    if (elPosition) {
      if (position.type == "insertBefore") {
        elPosition.parentElement.insertBefore(elem, elPosition);
      } else {
        if (elPosition && elPosition[position.type]) {
          elPosition[position.type](elem);
        }
      }
    } else {
      console.err("no elPosition!!");
    }

    return elem;
  }

  Worker.prototype.ieOnEnd = function (element, cb, index) {
    var self = this;

    element.onreadystatechange = function () {
      if (this.readyState != 'complete' && this.readyState != 'loaded') return
      this.onreadystatechange = null
      cb(null, index) // there is no way to catch loading errors in IE8
    }
  }

  Worker.prototype.listener = function (err, index ) {
    this.loadedCount++;

    if (this.loadedCount === this.totalResCount) {
      // load 완료
      this.callUserCallback();
      return;
    }

    if (this.data.sync) {
      index = index + 1;
      var obj = this.data.res[index];
      this.appendElement(obj, index);
    }
  };

  return new AsyncLoader();
});