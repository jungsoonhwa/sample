$(function(){
	'use strict';
	var $window = $(window),
		$body=$('body');
    
    var swiper;
    function mainSwiper(){
        swiper = new Swiper(".index-swiper", {
            direction: "vertical",
            speed:500 ,
            mousewheel: false, 
            spaceBetween: 0,
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },
            allowTouchMove:true ,
            breakpoints:{
                1400: {
                    allowTouchMove:false,
                }
            },
            on: {
                init: function(e){
                    var activeIdx = e.activeIndex; 
                    swiperCheck(activeIdx);
                },
                slideChangeTransitionStart: function(e){
                    swiper.mousewheel.disable(); 
                    var activeIdx = e.activeIndex ;
                    swiperCheck(activeIdx);
    
                    if ( e.realIndex == 1 ) {
                        swiperNest1.autoplay.start();
                    }
                    if ( e.realIndex == 4 ) {
                        swiperNest2.autoplay.start();
                    }
                    if ( e.realIndex == 6 ) {
                        // swiperCounter1.autoplay.start();
                        // countStart();
                    } else { 
                        // swiperCounter1.autoplay.stop();
                        // clearInterval(counterInterval);
                    }
                    $('.index-swiper , footer').css({'transform':'translateY(0)'});
                },
                slideChangeTransitionEnd: function(e){
                    var $activeslide = $('.index-swiper>div>.swiper-slide-active');
                    if ($activeslide.hasClass('progress-hide')){
                        $('.swiper-pagination-progressbar').hide();
                    } else {
                        $('.swiper-pagination-progressbar').show();
                    }
    
                    if ( e.realIndex > 0 && e.realIndex < 6 ){
                        swiper.mousewheel.enable();
                    }
                },
            }
        });
    }
    
    function swiperCheck(idx){
        console.log(idx)
        var mode = $('.index-swiper>div>.swiper-slide-active').data('mode') ; 
        if(mode == 'dark'){ 
            $('header , .index-swiper').addClass('dark');
        } else {
            $('header , .index-swiper').removeClass('dark');
        } 
        if (idx == 0){
            $('.index-top').addClass('active') ;
        } else {
            $('.index-top').removeClass('active') ;
        }

        if (idx == 6){ 
            swiperCounter1.autoplay.start();
        } else {
            swiperCounter1.autoplay.stop();
            swiperCounter1.slideTo(0);
        }

        $('.swiper-pagination-index').find('p>span').text('0'+(idx+1)) ;
    } 

    var swiperTopStartPos ;
    var swiperTop = new Swiper(".index-top", {
        direction: "vertical",
        effect: "fade",
        mousewheel: true,
        speed:300, 
        on: {
            init: function(e){ 
            },
            touchStart : function(e){ 
               swiperTopStartPos =  e.touches.currentY;
            },
            touchEnd : function(e){  
                var activeIdx = e.activeIndex; 
                if(swiper.destroyed) {
                    if (activeIdx == 1 && swiperTopStartPos >  e.touches.currentY){ 
                            var sctop = $('.section1').offset().top - $('header').height() ;
                            console.log(sctop);
                            $('html, body').animate({'scrollTop':sctop},400);
                    }
                }
            },
            slideChangeTransitionStart: function(e){  
                var activeIdx = e.activeIndex;
                if(!swiper.destroyed)  swiper.mousewheel.disable(); 
                e.slides.removeClass('last-top');
            },
            slideChangeTransitionEnd: function(e){ 
                var activeIdx = e.activeIndex + 1; 
                if(!swiper.destroyed) {
                    if(activeIdx == e.slides.length) {
                        e.slides.eq(e.slides.length-1).addClass('last-top');
                        lastSlideAction('last-top');
                    } 
                }
            },
        }
    });
    

    var swiperNest1 = new Swiper(".index-swiper-nest.nest1>.swiper", {
        spaceBetween: 10,
        slidesPerView: 1.1,
        mousewheel: false,
        loop:true,
        speed:1000,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".nest1 .nest-button-next",
            prevEl: ".nest1 .nest-button-prev",
        },
        breakpoints:{
            992: {
                spaceBetween: 40,
                slidesPerView: 1.35,
            }
        },
        on: {
            init: function(e){
                nestNums($('.index-swiper-nest.nest1'), e.realIndex, e.slides.length);
            },
            slideChangeTransitionEnd: function(e){ 
                nestNums($('.index-swiper-nest.nest1'), e.realIndex, e.slides.length);
            }
        }
    });
    
    var swiperNest2 = new Swiper(".index-swiper-nest.nest2>.swiper", {
        spaceBetween: 10,
        slidesPerView: 1.1,
        mousewheel: false,
        loop:true,
        speed:1000,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".nest2 .nest-button-next",
            prevEl: ".nest2 .nest-button-prev",
        },
        breakpoints:{
            992: {
                spaceBetween: 40,
                slidesPerView: 1.35,
            }
        },
        on: {
            init: function(e){
                nestNums($('.index-swiper-nest.nest2'), e.realIndex, e.slides.length);
            },
            slideChangeTransitionEnd: function(e){ 
                nestNums($('.index-swiper-nest.nest2'), e.realIndex, e.slides.length);
            }
        }
    });
    function nestNums($nestSwiper, activeIndex, slidesLens){ 
        var dups = $nestSwiper.find('.swiper-slide-duplicate').length;
            slidesLens -= dups ;
        if ($nestSwiper.hasClass('nest2')) {  
            activeIndex = $nestSwiper.find('.swiper-slide-active').data('group') - 1 ;
            slidesLens = Math.round(slidesLens / 2);
        }
        var activeIdx = (activeIndex+1 < 10)  ? '0' + (activeIndex+1) : (activeIndex+1);
        var slidesNums = (slidesLens < 10)  ? '0' + (slidesLens) : (slidesLens); 

        var activeTitle = $nestSwiper.find('.swiper-slide-active .title').html(),
            activeCss = $nestSwiper.find('.swiper-slide-active .title').attr('class') ;
        $nestSwiper.find('.swiper-pagination-num .page-num').html('<span>'+activeIdx+'</span> / <span>'+slidesNums+'</span>');
        $nestSwiper.find('.swiper-pagination-num .title').html(activeTitle).attr('class',activeCss);
    }
    swiperNest1.autoplay.stop();
    swiperNest2.autoplay.stop();
    
    var text0 = 0;
    var swiperCounter1 = new Swiper(".index-swiper-counter.count1>.swiper", {
        mousewheel: false,
        speed: 400,
        slidesPerView: "auto",
        centeredSlides: true,
        loop:false,
        autoplay: {
            delay: 600,
            disableOnInteraction: false,
            stopOnLastSlide: true
        },
        on: {
            init: function(e){
            },
            slideChangeTransitionStart: function(e){  
                var activeIdx = e.activeIndex + 1;  
                if(!swiper.destroyed) {
                    // swiper.mousewheel.disable();
                    if(activeIdx == e.slides.length) {
                        $('header , .index-swiper').removeClass('dark');
                    } else {
                        $('header , .index-swiper').addClass('dark');
                    }
                } else {
                    if(activeIdx == e.slides.length) {
                        $('.index-swiper-counter').parents('.swiper-slide').attr('data-mode','');
                    } else {
                        $('.index-swiper-counter').parents('.swiper-slide').attr('data-mode','dark');
                    }
                }
            },
            slideChangeTransitionEnd: function(e){ 
                var activeIdx = e.activeIndex + 1;  
                // if ( e.realIndex == 0 ){ 
                //     if(!swiper.destroyed) swiper.mousewheel.enable();
                // }
            },
        }
    });
    swiperCounter1.autoplay.stop();

    // 
    const firstcountSlide = document.querySelector('.first-count');
    firstcountSlide.addEventListener('wheel', function(event){  
        if (event.deltaY < 0){ 
            swiper.mousewheel.enable();
        } else if (event.deltaY > 0){  
            swiper.mousewheel.disable();
        }
    });
    function lastSlideAction(cls){
        var setclass = '.'+cls;
        const lastSlide = document.querySelector(setclass);
        
        lastSlide.addEventListener('wheel', function(event){  
            console.log(event.deltaY);
            if (event.deltaY < 0){   
                $(setclass).removeClass('pass') ;
            } else {
                if ( !$(setclass).hasClass('pass') && $(setclass).hasClass(cls) ) {
                    $(setclass).addClass('pass') ;
                    console.log($(setclass));
                    swiper.slideNext(); 
                    setTimeout(() => {
                        $(setclass).removeClass('pass') ;
                    }, 500);
                }
            }
        });  
        
    }


    // 마지막 슬라이드 풋터노출
    const lastSlide = document.getElementById('last-slide');
    lastSlide.addEventListener('wheel', function(event){
        var footerH = $('footer').height() ; 
        if (event.deltaY < 0){
            if( $('#last-slide').hasClass('down') ){
                $('.index-swiper , footer').css({'transform':'translateY(0)'});
                setTimeout(function(){
                    $('#last-slide').removeClass('down');
                } , 500) ;
                setTimeout(function(){ 
                    swiper.mousewheel.enable();
                } , 1000) ;
            } else {
                swiper.mousewheel.enable();
            }
        } else if (event.deltaY > 0){ 
            swiper.mousewheel.disable();
            $('#last-slide').addClass('down');
            $('.index-swiper , footer').css({'transform':'translateY(-'+footerH+'px)'});
        }
    }); 
    const mainSwipervar = mainSwiper()
    function swiperControl(){
        if ($window.width()<993){
            if (!swiper.destroyed) {
                console.log('destroyed');
                swiper.destroy();
            }
            $(".value-for").mCustomScrollbar({
                theme:"dark-thin",
                axis: "x"
            });
        } else {
            if (swiper.destroyed) {
                console.log('init');
                mainSwiper();
                $('html, body').animate({scrollTop:0},0);
                console.log($('body').scrollTop());
            }
            $(".value-for").mCustomScrollbar("destroy");
        }
    }

    
    var moCountStart = false ;
	function indexScrollSect(){
		var sT = $window.scrollTop(),
        wH = $window.height();
        if ($window.width()<993){ 
            var activeLen = -1 , activeIndex = -1 ;
            $('.index-swiper>.swiper-wrapper>.swiper-slide').each(function(e){
                var t = $(this),
                    tT = t.offset().top,
                    tH = t.innerHeight(),
                    tD = 0;

                var scpoint = sT + wH - 60; 
                if( scpoint > tT){ 
                    t.addClass('swiper-slide-active');
                    var $slideact = $('.index-swiper>.swiper-wrapper>.swiper-slide-active');
                    activeLen =  $slideact.eq($slideact.length - 1).index('.index-swiper>.swiper-wrapper>.swiper-slide') ; 
                } else { 
                    t.removeClass('swiper-slide-active');
                }
                 
            });
        }
    }
    
	$window.on('load resize',function(){
		swiperControl();
        indexScrollSect();
	});  

    
	$window.scroll(function(){
		indexScrollSect();
	}).trigger('scroll'); 
});