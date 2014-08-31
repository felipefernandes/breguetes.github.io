//Javascript

$(function() {

	$('.nav a').click(function() {
		var areaId = $(this).attr('href');
		$('body').scrollTo( areaId, 1000 );
	});


	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});



	$('#slider').carouFredSel({
		width: '100%',
		align: false,
		items: 3,
		items: {
			width: $('#wrapper').width() * 0.15,
			height: 500,
			visible: 1,
			minimum: 1
		},
		scroll: {
			items: 1,
			timeoutDuration : 5000,
			onBefore: function(data) {

				//	find current and next slide
				var currentSlide = $('.slide.active', this),
					nextSlide = data.items.visible,
					_width = $('#wrapper').width();

				//	resize currentslide to small version
				currentSlide.stop().animate({
					width: _width * 0.15
				});		
				currentSlide.removeClass( 'active' );

				//	hide current block
				data.items.old.add( data.items.visible ).find( '.slide-block' ).stop().fadeOut();					

				//	animate clicked slide to large size
				nextSlide.addClass( 'active' );
				nextSlide.stop().animate({
					width: _width * 0.7
				});						
			},
			onAfter: function(data) {
				//	show active slide block
				data.items.visible.last().find( '.slide-block' ).stop().fadeIn();
			}
		},
		onCreate: function(data){

			//	clone images for better sliding and insert them dynamacly in slider
			var newitems = $('.slide',this).clone( true ),
				_width = $('#wrapper').width();

			$(this).trigger( 'insertItem', [newitems, newitems.length, false] );

			//	show images 
			$('.slide', this).fadeIn();
			$('.slide:first-child', this).addClass( 'active' );
			$('.slide', this).width( _width * 0.15 );

			//	enlarge first slide
			$('.slide:first-child', this).animate({
				width: _width * 0.7
			});

			//	show first title block and hide the rest
			$(this).find( '.slide-block' ).hide();
			$(this).find( '.slide.active .slide-block' ).stop().fadeIn();
		}
	});

	//	Handle click events
	$('#slider').children().click(function() {
		$('#slider').trigger( 'slideTo', [this] );
	});

	//	Enable code below if you want to support browser resizing
	$(window).resize(function(){

		var slider = $('#slider'),
			_width = $('#wrapper').width();

		//	show images
		slider.find( '.slide' ).width( _width * 0.15 );

		//	enlarge first slide
		slider.find( '.slide.active' ).width( _width * 0.7 );

		//	update item width config
		slider.trigger( 'configuration', ['items.width', _width * 0.15] );
	});

});