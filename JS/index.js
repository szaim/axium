
var fetchReviews = function() {
	$.getJSON('data.json', function(data) {
		data.data.reviews.forEach(buildReviewList);
	})
};

var template = $('<div class="reviews-wrapper"><div class="reviewer"><img class="reviewerImg"><span class="reviewer-name"></span></div><div class="review-text"><h5></h5><div class="star"></div><p></p></div></div>');
var reviewList = $('.section-N3').children('.sub-container');

var buildReviewList = function(options) {
	var current = template.clone();
	current.find('.reviewerImg').attr('src', options.reviewerImg);
	current.find('.reviewer-name').text(options.reviewerName);
	current.find('h5').html(options.title + '<span>' + options.date + '</span>');
	current.find('p').text(options.review);
	for(var i = 1; i <= options.rating; i++) {
		current.find('h5').append('<img class=star src='+options.star+'>');
	};
	reviewList.append(current);
}


$(document).ready(function() {

	fetchReviews();

	$('.sub-menu-parent').hover(function() {
		var subMenu = $(this).children('.sub-menu');
		subMenu.toggleClass('show-sub-menu');
	});

	$('.dropDown-button').click(function(e){
	    e.preventDefault();
	    
	    fieldName = $(this).attr('data-field');
	    type      = $(this).attr('data-type');
	    var input = $("input[name='"+fieldName+"']");
	    var currentVal = parseInt(input.val());
	    if (!isNaN(currentVal)) {
	        if(type == 'qtyminus') {
	            
	            if(currentVal > input.attr('min')) {
	                input.val(currentVal - 1).change();
	            } 
	            if(parseInt(input.val()) == input.attr('min')) {
	                $(this).attr('disabled', true);
	            }

	        } else if(type == 'qtyplus') {

	            if(currentVal < input.attr('max')) {
	                input.val(currentVal + 1).change();
	            }
	            if(parseInt(input.val()) == input.attr('max')) {
	                $(this).attr('disabled', true);
	            }

	        }
	    } else {
	        input.val(1);
	    }
	});
	$('.q-input').change(function() {
	    
	    minValue =  parseInt($(this).attr('min'));
	    maxValue =  parseInt($(this).attr('max'));
	    valueCurrent = parseInt($(this).val());
	    
	    name = $(this).attr('name');
	    if(valueCurrent >= minValue) {
	        $(".dropDown-button[data-type='qtyminus'][data-field='"+name+"']").removeAttr('disabled')
	    } else {
	    	$(this).val(minValue);
	    }
	    if(valueCurrent <= maxValue) {
	        $(".dropDown-button[data-type='qtyplus'][data-field='"+name+"']").removeAttr('disabled')
	    } else {
	    	$(this).val(maxValue);
	    }	    
	    
	});
	var numCart = 0;
	$('.validation-button').click(function(e) {
		e.preventDefault();
		if($('.size option:selected').text() == 'Select Size' || $('.color option:selected').text() == 'Select Color') {
			alert('please select your options before adding to the Cart');
		} else {
			numCart++;
			alert('Cart:'+ numCart + ', ' + 'size: ' + $('.size option:selected').text() + ', ' + 'color: ' + $('.color option:selected').text() + ', ' + 'Qnty: ' + $('.q-input').val());
		}
	})

});