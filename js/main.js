var maxLoop = 10;
var iLoop = 0;
var iImgs = 14;
var iImgHeight = 400;
var bHeight = iImgHeight;

$(document).ready(function() {
	$(".gc-frame").append("<div class=\"gc-img\"></div>");
	initHeight();
	$(window).scroll(function(e) {
		growIfAllowed();
		var firstHeight = $(".gc-img").first().height();
		var scrollTop = $(window).scrollTop();			
		$(".gc-img").each(function(e) {
			$this = $(this);
			$parent = $this.parent();
			var pTop = $parent.offset().top;
			var pHeight = $parent.height();
			var tBottom = (pTop - scrollTop - (firstHeight - pHeight));
			if (tBottom < (pHeight*2) && tBottom > (pHeight*-2)) {
				$this.css({bottom: tBottom});
			}
		});
	});
	
	$(window).resize(function(e) {
		initHeight();
	});
	
	$("body").keydown(function(e) {
		if(e.keyCode == 32) {
			growIfAllowed();
		}
	});
});

function initHeight() {
	var wHeight = $(window).height();
	bHeight = wHeight / 2;
	bHeight = (bHeight < iImgHeight) ? iImgHeight : bHeight;
	$(".gc-frame").height(bHeight);
	$(".gc-frame").first().height(wHeight);
}

function growIfAllowed() {
	if (canGrow()) {
		grow(iImgs);
	} 
}

function canGrow() {
	var scroll = $(window).scrollTop();
	var wHeight = $(window).height();
	var dHeight = $(document).height();
	return (((scroll + (wHeight*2)) > dHeight) && (iLoop < maxLoop));
}

function grow(number) {
	iLoop ++;
	if (iLoop < maxLoop) {
		for (i = 1; i <= number; i++) {
			$("#animationContent").append("<div class=\"gc-frame gc-frame-" + i + "\" style=\"height:" + bHeight + "px\"><div class=\"gc-img\"></div</div>");
		}
	} else {
		end();
	}
}

function end() {
	var endContent = $("#animationEnd").html();
	$("#animationContent").append("<div class=\"gc-frame gc-frame-1\" style=\"height:" + bHeight + "px\" >" + endContent + "</div>");
	$(".scrollReset").on('click', function(e) {
		$('html, body').animate({
			scrollTop: $("#animationContent").offset().top
		}, 4000);
	});
	$("#scrollDown").show().children().on('click', function(e) {
		$('html, body').animate({
			scrollTop: $("#animationContent").offset().top + $("#animationContent").height()
		}, 7000);
	});
}