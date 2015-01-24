
var FACEBOOK_API_URL = "http://graph.facebook.com/?id="
var TWITTER_API_URL = "http://cdn.api.twitter.com/1/urls/count.json?url=";
var LINKEDIN_API_URL = "http://www.linkedin.com/countserv/count/share?url=";
var GOOGLEPLUS_API_URL = "https://clients6.google.com/rpc?key=AIzaSyDohgT_6xKvM-w9KcjMKOYy7CxVHD4z_vY";
var PINTEREST_API_URL = "http://api.pinterest.com/v1/urls/count.json?url="


function counters() {
	url = $("#social-variables").data("url");
	
	//Facebook
	$.getJSON(FACEBOOK_API_URL + url, function( data ) {
        $('.social-facebook .social-counter').html(getShares(data.shares));
    });
    
	//Twitter
	fetchShareCount(TWITTER_API_URL + url, function( data ) {
		$(".social-twitter .social-counter").html(getShares(data.count));
	});
	
	//LinkedIn
	fetchShareCount(LINKEDIN_API_URL + url, function ( data ) {
		$(".social-linkedin .social-counter").html(getShares(data.count));
    });
    
	//Pinterest
	fetchShareCount(PINTEREST_API_URL + url, function ( data ) {
		$(".social-pinterest .social-counter").html(getShares(data.count));
	});
	
	//Google Plus 
	$(".social-google-plus .social-counter").hide();
}

function fetchShareCount(url, callback) {
	$.ajax({
		type: "POST",
		jsonp: "callback",
		dataType: 'jsonp',
		url: url,
		cache: false,
		success: callback
	});
}

function getShares(shares) {
	return format(shares || 0);
}

function format(shares) {
	return ((shares >= 1000) ? numeral(shares).format('0.0a') : shares);
}

function shareLinks() {
	url = $("#social-variables").data("url");
	title = $("#social-variables").data("title");
	excerpt = $("#social-variables").data("excerpt");
	
	$(".social-facebook").each(function() {
		var elem = $(this);
		href = elem.data("href");
		appId = "682741705180900";
		elem.data("url", href + "?app_id=" + appId + "&u=" + encodeURIComponent(url) + "&display=popup&ref=plugin");
	});
	
	$(".social-twitter").each(function() {
		var elem = $(this);
		href = elem.data("href");
		via = "CasselsGraeme";
		elem.data("url", href + "?url=" + encodeURIComponent(url) + "&original_referer=" + encodeURIComponent(document.location.href) + "&source=tweetbutton&text=" + encodeURIComponent(title) + "&via=" + encodeURIComponent(via));
	});
	
	$(".social-tweetable").each(function() {
		var elem = $(this);
		href = elem.data("href");
		quote = "\"" + elem.data("quote") + "\"";
		hashtags = elem.data("hashtags") || "";
		via = "CasselsGraeme";
		elem.data("url", href + "?url=" + encodeURIComponent(url) + "&original_referer=" + encodeURIComponent(document.location.href) + "&source=tweetbutton&text=" + encodeURIComponent(quote) + "&via=" + encodeURIComponent(via) + "&hashtags=" + encodeURIComponent(hashtags));
	});
	
	$(".social-linkedin").each(function() {
		var elem = $(this);
		href = elem.data("href");
		source = "Graeme Cassels";
		elem.data("url", href + "?mini=true&url=" + encodeURIComponent(url) +"&title=" + encodeURIComponent(title) + "&source=" + encodeURIComponent(source) + "&summary=" + encodeURIComponent(excerpt));
	});
	
	$(".social-google-plus").each(function() {
		var elem = $(this);
		href = elem.data("href");
		elem.data("url", href + "?url=" + encodeURIComponent(url));
	});
}

$(document).ready(function(e) {
	counters();
	shareLinks();
	$(".social").each(function() {
		var elem = $(this);
		url = elem.data("url");
		width = elem.data("width") || 600;
		height = elem.data("height") || 300;
		
		elem.attr({onclick: "window.open('" + url + "', 'newwindow', 'width=" + width + ", height=" + height + "'); return false;"});
	});
	/*$(".social").on("click", function(e) {
		var elem = $(this);
		width = $(elem).attr("data-width") || 600;
		height = $(elem).attr("data-height") || 300;
		
		window.open("google.com", 'newwindow', "width: " + width + "; height: " + height);
		e.preventDefault();
	});
	//FACEBOOK
	/*$(".social-facebook").click(function(e) {
		e.preventDefault();
		FB.ui({
		  method: 'share',
		  href: encodeURIComponent($(this).attr('href')),
		}, function(response){});
	});
	
	//TWITTER
	var API_URL = "http://cdn.api.twitter.com/1/urls/count.json",
    TWEET_URL = "https://twitter.com/intent/tweet";
     
	$(".social-twitter").each(function() {
		var elem = $(this),
		// Use current page URL as default link
		url = encodeURIComponent(elem.attr("data-url") || document.location.href),
		// Use page title as default tweet message
		text = encodeURIComponent(elem.attr("data-text") || document.title),
		via = encodeURIComponent(elem.attr("data-via") || ""),
		related = encodeURIComponent(elem.attr("data-related") || ""),
		hashtags = encodeURIComponent(elem.attr("data-hashtags") || "");
	 
		// Set href to tweet page
		elem.attr({
			href: TWEET_URL + "?url=" + url + "&hashtags=" + hashtags + "&original_referer=" +
					encodeURIComponent(document.location.href) + "&related=" + related +
					"&source=tweetbutton&text=" + text + "&via=" + via,
			target: "_blank"
		});
	 
		// Get count and set it as the inner HTML of .count
		$.getJSON(API_URL + "?callback=?&url=" + url, function(data) {
			elem.find(".social-counter").html(data.count);
		});
	});
	
	//LINKEDIN
	var API_URL = "http://cdn.api.twitter.com/1/urls/count.json",
    LINKEDIN_URL = "http://www.linkedin.com/shareArticle?mini=true";
     
	$(".social-linkedin").each(function() {
		var elem = $(this),
		// Use current page URL as default link
		url = encodeURIComponent(elem.attr("data-url") || document.location.href),
		title = encodeURIComponent(elem.attr("data-title") || document.title),
		source = encodeURIComponent(elem.attr("data-source") || ""),
		summary = encodeURIComponent(elem.attr("data-summary") || "");
	 
		elem.attr({
			href: LINKEDIN_URL + "&url=" + url + "&title=" + title + "&source=" + source + "&summary=" + summary,
			target: "_blank"
		});
	 
		// Get count and set it as the inner HTML of .count
		//$.getJSON(API_URL + "?callback=?&url=" + url, function(data) {
		//	elem.find(".social-counter").html(data.count);
		//});
	});*/
});