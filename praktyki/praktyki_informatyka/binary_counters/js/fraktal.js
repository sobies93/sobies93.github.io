
$(function() {
	$('.hideInitial').hide();
	$('.show').click(function() {
		$($(this).attr('data-show')).show();
	});

	$('.transform').click(function(){
		var target = $(this).attr('data-target');
		var base = $(this).attr('data-base');
		var source = $(this).attr('data-source');

		var value = $(`.${source}`).val();
		var power = 1;
		var numbers = [];
		console.log(value, base);
		while (value > 0) {
			numbers.push(value % base);
			console.log(value);
			value = Math.floor(value / base);
		}
		var string = '';
		var strings = [];
		_.forEach(numbers, function(val, index) {
			strings.push(`${val} * ${base}<sup>${index}</sup>`);
		})
		$(`.${target}`).html(strings.reverse().join(' + '));
	});
});
