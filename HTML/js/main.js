jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).load(function(){
		preloader.remove();
	});

	//#main-slider
	var slideHeight = $(window).height();
	var navHeight = $('.main-nav').height();

	$('#home-slider .item').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#home-slider .item').css('height',slideHeight);
	});
	
	//Scroll Menu
	// $(window).on('scroll', function(){
	// 	if( $(window).scrollTop()>navHeight ){
	// 		$('.main-nav').addClass('navbar-fixed-top');
	// 	} else {
	// 		$('.main-nav').removeClass('navbar-fixed-top');
	// 	}
	// });
	
	// Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('.navbar-collapse').find('.scroll a').each(function(){
			contentTop.push( $( $(this).attr('href') ).offset().top);
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})
	};

	$('#tohash').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});
	
	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();

	//testimonial

	$('.flexslider1').flexslider({
        animation: "slide",
        controlNav: "thumbnails",
        start: function(slider){
          $('body').removeClass('loading');
        }
    });

	$('.flexslider1 .flex-control-nav li').each(function(index, element){
		setTimeout( function(){
				    $(element).addClass('animated slideOutDown');
				  }, (100 * index));
	});

	$(window).scroll(function(){
		if($('#testimonial').length){
			var top = $('#testimonial').offset().top - 600;
		    if($(this).scrollTop() >= top){	        
				$('.flexslider1 .flex-control-nav li').each(function(index, element){
					setTimeout( function(){
							    $(element).removeClass('slideOutDown').addClass('animated bounceInUp');
							  }, (100 * index));
				});
		    }
		}	    
	});
	
	
	// Progress Bar
	$('#about-us').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$.each($('div.progress-bar'),function(){
				$(this).css('width', $(this).attr('aria-valuetransitiongoal')+'%');
			});
			$(this).unbind('inview');
		}
	});

	//Countdown
	$('#features').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$(this).find('.timer').each(function () {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
			$(this).unbind('inview');
		}
	});

	// Portfolio Single View
	$('#portfolio').on('click','.folio-read-more',function(event){
		event.preventDefault();
		var link = $(this).data('single_url');
		var full_url = '#portfolio-single-wrap',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_top = $("#"+trgt).offset().top;

		$('html, body').animate({scrollTop:target_top}, 600);
		$('#portfolio-single').slideUp(500, function(){
			$(this).load(link,function(){
				$(this).slideDown(500);
			});
		});
	});

	// Close Portfolio Single View
	$('#portfolio-single-wrap').on('click', '.close-folio-item',function(event) {
		event.preventDefault();
		var full_url = '#portfolio',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_offset = $("#"+trgt).offset(),
		target_top = target_offset.top;
		$('html, body').animate({scrollTop:target_top}, 600);
		$("#portfolio-single").slideUp(500);
	});

	
	$('.cdropdown').hover(function() {
	  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
	}, function() {
	  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
	});

	$('.product_rating_stars').on('click', function(){
		var target_top = $(".ranking_caption").offset().top - 100;
		$('html, body').animate({scrollTop:target_top}, 800);
	});


	$('a[data-toggle="collapse"]').click(function () {
		if ($(this).find('span.toggle-icon').hasClass('glyphicon-chevron-down')) {
			$($(this).attr('data-parent') + ' a[data-toggle="collapse"]').find('span.toggle-icon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');		
		}else{
			$($(this).attr('data-parent') + ' a[data-toggle="collapse"]').find('span.toggle-icon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
			$(this).find('span.toggle-icon').removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');		
		}		
	});
	
	// vendor_profile.html	
	$('.price_heading').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		var index = $('.price_heading').index($(this));
		if ( $('.toggle_icon').eq(index).hasClass('fa-plus-circle')) {
			$('.toggle_icon').eq(index).removeClass('fa-plus-circle').addClass('fa-minus-circle');
		}else{
			$('.toggle_icon').eq(index).removeClass('fa-minus-circle').addClass('fa-plus-circle');
		}
		
	});
	// google.maps.event.addDomListener(window, 'load', initialize_map);

	$('.input-date').datepicker({ });

	$('.draggable-table tbody').sortable({
		axis: 'y',
		cursor: 'move'
	});

	$('#thumbnail_carousel').flexslider({
	    animation: "slide",
	    controlNav: false,
	    animationLoop: false,
	    slideshow: false,
	    itemWidth: 100,
	    itemMargin: 5,
	    asNavFor: '#product_slider'
	  });
	 
	$('#product_slider').flexslider({
	    animation: "slide",
	    controlNav: false,
	    animationLoop: false,
	    slideshow: false,
	    sync: "#thumbnail_carousel"
	  });

	$("input.slider").bootstrapSlider({
		formatter: function(value) {
			return value + ' miles';
		}
	});

	$("input.slider").on('change', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('.search-filter .radius').val($(this).val());
	});

	$('.text-editor').froalaEditor();

	$('.add-to-do-extra').on('focus', function(){
		$(this).hide();
		$(this).parent().children('.add-to-do .fr-box').slideDown();
	});

	$('.list-group-sortable-connected').sortable({
        placeholderClass: 'list-item',
        connectWith: '.connected'
    });

    $('[data-toggle="tooltip"]').tooltip(); 

    $('.add-item-btn').on('click', function(){
    	$(this).hide();
    	$(this).parent().children('.add-to-do').slideDown();
    });

    $('.add-list-item-buttons a').on('click', function(){
    	$(this).parent().parent().slideUp();
    	$(this).parent().parent().parent().children('.add-item-btn').show();
    });

    $('#checklist-container .list-item>.fa').on('click', function(){
    	if ($(this).hasClass('fa-circle-o')){
    		$(this).removeClass('fa-circle-o').addClass('fa-check-circle').addClass('text-success');
    	}else{
    		$(this).removeClass('fa-check-circle').removeClass('text-success').addClass('fa-circle-o');
    	}
    });

    $('.add-schedules').on('focus', function(event) {
    	event.preventDefault();
    	/* Act on the event */
    	$(this).hide();
    	$(this).parent().children('.schedules').slideDown();
    });

});

