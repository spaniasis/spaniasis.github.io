var homepageSlider = (function($) {

    //set default options of the slider
	var options = {
		autoplay: true,
		delay: 20000 //time between slides
	};

	var slides = $('#homepage_slider').find('.homepage-slide');	

    $(document).ready(function() {
        init();
    });

    $('#play_pause_control').on('click', function(e){
        e.preventDefault();
        if(options.autoplay){
            clearInterval(timer);
            $(this).find('.glyphicon-pause').removeClass('glyphicon-pause').addClass('glyphicon-play');
            $(this).find('.sr-only').text('play');
            options.autoplay = false;
        }else{
            $(this).find('.glyphicon-play').removeClass('glyphicon-play').addClass('glyphicon-pause');
            $(this).find('.sr-only').text('pause');
            options.autoplay = true;
            resetAutoPlayTimer();
        }        
    });

    $('#homepage_slider').on('click', '.slide-indicators', function(e) {
        e.preventDefault();
        changeSlide($(e.target).attr('data-target'));
    });

    $('.slider-control').on('click', 'a', function(e) {
    	var slideOffset = +$(this).attr('data-target');

        e.preventDefault();
        if(slideOffset > 0){
        	changeToNextSlide(getActiveSlideIndex());  
        }else{
        	changeToPrevSlide(getActiveSlideIndex());
        }
    });

	$('#homepage_slider').on("swipeleft", function( event ) {
		changeToNextSlide(getActiveSlideIndex());
	});

	$('#homepage_slider').on("swiperight", function( event ) {
		changeToPrevSlide(getActiveSlideIndex());
	});


    //initialize slider by adding controls and indecies for each slide
    var init = function() {
    	//populate indicators on each slide
        if (options.autoplay) {
            $('#play_pause_control').append('<a href="#"><span class="glyphicon glyphicon-pause"></span><span class="sr-only">play/pause slides autoplay</span></a>');
        }else{
            $('#play_pause_control').append('<a href="#"><span class="glyphicon glyphicon-play"></span><span class="sr-only">play/pause slides autoplay</span></a>');
        }
        
        $('.slider-control.prev-btn').append('<a href="#" data-target="-1"><span class="glyphicon glyphicon-menu-left"></span><span class="sr-only">click to show the next slide</span></a>');
        $('.slider-control.next-btn').append('<a href="#" data-target="1"><span class="glyphicon glyphicon-menu-right"></span><span class="sr-only">click to show the previous slide</span></a>')
        for (var i = 0; i < slides.length; i++) {
            var listStr = '';
            for (var j = 0; j < slides.length; j++) {
            	if(i === j){
            		listStr += '<li><a href="#" data-target="' + j + '" class="active"><span class="sr-only">slide '+ (parseInt(j)+1) +'</span></a></li>';
            	}else{
            		listStr += '<li><a href="#" data-target="' + j + '"><span class="sr-only">slide '+ (parseInt(j)+1) +'</span></a></li>';
            	}                
            }
            $(slides.get([i])).find('.slide-img').after(
                '<div class="slide-indicators">' +
                '<ol>' +
                listStr +
                '</ol>' +
                '</div>'
            );
        }
    };

    var autoplay = function(){
	    changeToNextSlide(getActiveSlideIndex());
    };

    var resetAutoPlayTimer = function(){
        clearInterval(timer);
        timer = setInterval(autoplay, options.delay);        
    };

    if(options.autoplay){
        console.log(options.autoplay);
	    var timer = setInterval(autoplay, options.delay);
	}

    var getActiveSlideIndex = function(){
    	return +$('#homepage_slider').find('.homepage-slide.active').find('.active').attr('data-target');
    };

    var changeSlide = function(slideNum) {    	
    	var targetSlide = $($('#homepage_slider').find('.homepage-slide').get(slideNum));
    	var activeSlide = $('#homepage_slider').find('.homepage-slide.active');
        if (slideNum !== undefined && activeSlide.length === 1) {        	
            activeSlide.hide().removeClass('active');
			targetSlide.fadeIn( 0, function() {
				// Animation complete.
				targetSlide.addClass('active');						
			});
			if(options.autoplay){
                resetAutoPlayTimer();
			}
        }
    };

    var changeToPrevSlide = function(currSlide){
    	changeSlide((currSlide-1)%slides.length);
    };

    var changeToNextSlide = function(currSlide){
    	changeSlide((currSlide+1)%slides.length);
    } 

})($);
