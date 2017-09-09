var main = function(){
	"use strict";
	$(".comment-input button").on("click", function(event){
		addCommnet();
	});

	$('.comment-input input').on('keypress',function(event){		
		if(event.keyCode === 13){
			addCommnet();		
		}
	});

	function addCommnet(){
		var $new_comment;
		if($(".comment-input input").val() !== ''){
			var $commnet_text = $(".comment-input input").val();
			$new_comment = $('<p>').text($commnet_text);
			$new_comment.hide();
			$(".comments").append($new_comment);
			$new_comment.fadeIn();
			$('.comment-input input').val('');
		}
	}
};

$(document).ready(main);

