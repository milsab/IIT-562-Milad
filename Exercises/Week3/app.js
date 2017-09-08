var main = function(){
	"use strict";
	$(".comment-input button").on("click", function(event){
		$('.comments').append('<p> new Comment</p>');
	});
};

$(document).ready(main);

