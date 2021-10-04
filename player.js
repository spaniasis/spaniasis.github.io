$(document).ready(function(){
  $('.carousel').slick({
    dots: true,
  infinite: true,
  speed: 800,
  fade: true,
  cssEase: 'linear'
  });


  $(".slick-dots").prepend('<li><button id="playButton" class="pause" type="button" data-role="none" role="button" aria-required="false" tabindex="0">Pause</button></li>');



$('#playButton').click(function()
{
 if($(this).hasClass('pause'))
 {
    $('.carousel').slick('slickPause');
	//$('.carousel').slickPause();
	console.log('pause');
    $('#playButton').removeClass('pause');
    $('#playButton').text('Play');
 }
 else{
	 console.log('play');
   $('.carousel').slick('slickPlay');
   $('#playButton').addClass('pause');
   $('#playButton').text('Pause');
 }
 

});
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 // for mobile only
}
else{
$('.carousel').slick('slickPlay');
}


});
// JavaScript Document