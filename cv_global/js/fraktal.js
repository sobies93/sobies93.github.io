
$(function() {
	$('.hideInitial').hide();
	$('.show').click(function() {
		$($(this).attr('data-show')).show();
	});
});
