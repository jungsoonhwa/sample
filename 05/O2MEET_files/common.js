
$(function (){   
	'use strict';
	var $window = $(window),
		$body=$('body');
	// gnb  
	$('button.menu-open').on('click',function(){
		$('body').toggleClass('gnb-open') ;
		if ( !$('body').hasClass('gnb-open') ){
			closemenu();
		}
	});
    
	$('ul.dep1>li').on('click',function(){
		var $tg = $(this).find('div');
		if ($window.width()<993){ 
			if ($tg.length){
				$('ul.dep1>li').find('div').slideUp(0);
				if (!$(this).hasClass('open')){
					$(this).addClass('open') ;
					$tg.slideToggle( 300, 'linear');
				} else {
					$(this).removeClass('open') ;
				}
			}
		}
	});
	function closemenu(){
		$('body').removeClass('gnb-open') ;
		$('ul.dep1>li').removeClass('open') ;
		$('ul.dep1>li').find('div').attr('style','');
	}
	// ---------- gnb  

	$window.scroll(function(){
		scrollSection();
	}).trigger('scroll');

	$window.resize(function(){
		if ($window.width() > 992){ 
			closemenu();
		}
	});


	// scroll animation
	function scrollSection(){
		var sT = $window.scrollTop(),
			wH = $window.height();
		$('.ani-sect').each(function(){
			var t = $(this),
				tT = t.offset().top,
				tH = t.innerHeight(),
				tD = 0;
			if(tT-wH<sT-tD){
				t.find('.animate__animated').removeClass('ani-stop').addClass('active');
			} else {
				t.find('.animate__animated').addClass('ani-stop').removeClass('active');
			}
		});
	}
    
	$(window).on("load",function(){
		var picker = $( ".datepicker" ).length ;
		if (picker > 0){
			$( ".datepicker" ).datepicker({ dateFormat: 'yy-mm-dd' }).val();
		}
	}); 

	// 비디오 재생 옵션
	$('.link-video').click(function(){
		var playVid = $(this).children('video')[0];
		$(this).addClass('playing');
		playVid.play();
		playVid.setAttribute('controls','controls');
		playVid.addEventListener('ended',function(){
			$(this).parent().removeClass('playing');
			playVid.removeAttribute('controls');
		});
	});
	$('[class^="swiper-button-"]').click(function(){
		$('.link-video video')[0].pause();
		$('.link-video video')[0].currentTime = 0;
		$('.link-video video')[0].removeAttribute('controls');
		$('.link-video').removeClass('playing');
	});
     
});