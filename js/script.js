$(document).ready(function() {
	$(window).scroll(function(e) {
		var scrollTop = $(window).scrollTop();			
		
		$(".parallax-back").each(function(e) {
			var z = $(this).data("parallax-z");
			var offset = -100;
			var yPos = scrollTop * z;
			$(this).css("background-position-y", ((yPos > 0) ? yPos : 0) + "px");
		});
	});
	
	var thumbHeight = 0;
	$(".thumb").each(function() {
		var height = $(this).height();
		if (height > thumbHeight) {
			thumbHeight = height;
		}
	});
	
	$(".thumb").height(thumbHeight);
	
	
	$(".grid-item").each(function() {
		$(this).height($(this).width());
		$(this).find(".excerpt").hide();
	}).on('mouseenter', function() {
		$(this).find(".excerpt").slideDown();
	}).on('mouseleave', function() {
		$(this).find(".excerpt").slideUp();
	});
	
});