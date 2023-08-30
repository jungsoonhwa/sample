jQuery(function ($) {  
  //aside
  $('.asidebar').hover(function(){
    $(this).addClass('wide');
  },function(){
    $(this).removeClass('wide');
    if($('.aside li').hasClass('active')){
      $('.aside li').removeClass('active');
      $('.aside li').find('ul').slideUp(300);
    };
  });
  $('.asidebar > .close').click(function(){
    $('.asidebar').removeClass('wide');
  });

  $(function(){
    var aside = $('.aside');

    aside.on('click', 'li a', function(e){
      var li = $(this).parent();

      if(li.find('ul').length > 0){
        e.preventDefault();

        if(li.hasClass('active')){
          li.removeClass('active').find('li').removeClass('active');
          li.find('ul').slideUp(300);
        }else{

          if(li.parents('li.active').length == 0){
            aside.find('li').removeClass('active');
            aside.find('ul').slideUp(300);
          }else{
            li.parent().find('li').removeClass('active');
            li.parent().find('> li ul').slideUp(300);
          }

          li.addClass('active');
          li.find('>ul').slideDown(300);
        }
      };
    });
  });

  // mobile - header
  $('.m-gnb-btn').on('click',function(){
    if($(this).hasClass('gnb-open')){
      $('body').removeClass('layer-open');
      // $('.dim').remove();
      $(this).removeClass('gnb-open');
      $('#gnb').removeClass('gnb-open');
      $(".noheader").addClass("transparent");
      $(".noheader").addClass("background");
      // 20221215추가
      $(".menu .menu_li > a").next("div").slideUp(400);
      // $("a.dim").off('click');
    } else {
      $('body').addClass('layer-open');
      // $(this).before('<a class="dim"></a>');
      $(this).addClass('gnb-open');
      $('#gnb').addClass('gnb-open');

      $(".noheader").removeClass("transparent");
      $(".noheader").removeClass("background");
      $("a.dim").on('click', function(){
        $('.m-gnb-btn').trigger('click');

      });
    }
  });

  //mobile - aside
  asideOpen($('#mypage-btn'), $('#mpnb'));
  asideOpen($('#network-btn'), $('#ncnb'));

  function asideOpen(btnObj, asideObj) {
    $(btnObj).on('click',function(){
      $('body').addClass('layer-open');
      $(this).parents().next('.asidebar').before('<a class="dim"></a>');
      $(this).addClass('aside-open');
      $(asideObj).addClass('aside-open');
      $('.dim').on('click', function(){
        $('body').removeClass('layer-open');
        $('.dim').remove();
        $(this).removeClass('aside-open');
        $(asideObj).removeClass('aside-open');
      });
    });
    $('.asidebar .close').on('click',function(){
      $('body').removeClass('layer-open');
      $('.dim').remove();
      $(this).removeClass('aside-open');
      $(asideObj).removeClass('aside-open');
    });
  }

  //페이지 공유하기
/*  $(".share-btn").on('click',function(){
    $(this).next('.sns-list').show();
  });*/

  //아코디언
  $(".sub-title.tog").on('click',function(){
    $(this).toggleClass('off');
    $(this).next("div.tog").slideToggle(200);
  });
  
  // 검색 탭
  $('.cate-list').click(function() {
    var activeTab = $(this).attr('data-tab');
    // $('.cate-list').removeClass('current');
    // $('.cate-list-tab').removeClass('current');
    
    if($(this).hasClass('current')){
      $(this).removeClass('current');
      $('#' + activeTab).removeClass('current');
    } else{
      $('.cate-list').removeClass('current');
      $('.cate-list-tab').removeClass('current');
      $(this).addClass('current');
      $('#' + activeTab).addClass('current');
    }
  });

  // 검색 - 플로팅
  $('#search-btn').on('click',function(){
    $('body').addClass('layer-open');
    $(this).after('<a class="dim"><i class="sr-only">close</i></a>');
    $('.search-bx').addClass('open');
  });
  $('.search-bx > .search-close').on('click',function(){
    $('body').removeClass('layer-open');
    $('.dim').remove(); 
    $('.search-bx').removeClass('open');
  });

  // ScrollTop 버튼
  $('#topBtn').hide();
  $(document).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('#topBtn').fadeIn();
    } else {
      $('#topBtn').fadeOut();
    }
  });
  $('#topBtn').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 200);
      return false;
  });

  //댓글 sub-btn 버튼
  $('.cBox-list').on('click', '.cBox-sub-btn .sub-btn', function(){
    $(this).next('.cBox-sub-inner').toggleClass('on');
  });

  // 기업자료 다운로드 버튼
  $('.site-list .btn2').on('click', function(){
    if ($(this).hasClass('btn-white')) {
      $(this).removeClass('btn-white');
      $(this).next('.list-sub').show();
    } else {
      $(this).addClass('btn-white');
      $('.list-sub').hide();
    }
  });

  // sns 공유하기
  $(".share-bx .sns-share").on('click',function(){
    $(this).addClass('on');
    $(this).next('.sns-list').show();
  });
  $(".sns-list .close").on('click',function(){
    $(this).parents().prev('.sns-share').removeClass('on');
    $(this).parents('.sns-list').hide();
  });
});

/*$('.ft-slider-01').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
      }
    }
  ]
});
$('.ft-slider-02').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
      }
    }
  ]
});
$('.ft-slider-03').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
      }
    }
  ]
});*/


// 레이어팝업
function callPop(classId){
	// $(classId).bPopup();
  var bpopup = $(classId).bPopup();
	bpopup.reposition(0);
}


//레이어팝업 닫기
function closePop(classId){
	
  var bpopup = $(classId).bPopup().close();
}

//20221222 수정
  
$(document).ready(function(){
  $(".event_ul > li").click(function(){
    $(this).addClass('active');
    $(this).siblings('li').removeClass('active');
  });
});

// rnd li 클릭시 드롭다운 slide
$(document).ready(function(){
  $(".menu.mo_ver .menu_li > a").click(function(){
    var submenu = $(this).next("div");
    submenu.slideToggle(400);
    $(this).toggleClass("on");
    $(this).parent("li").siblings("li").children("a").removeClass('on');
    $(this).parent("li").siblings("li").children("div").slideUp(400);
  });
});


