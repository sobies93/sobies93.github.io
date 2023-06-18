
$(function() {
	$('.hideInitial').hide();
	$('.show').click(function() {
		$($(this).attr('data-show')).show();
	});

	$('.increase').click(function() {
		var target = $(this).attr('data-target');
		var base = $(`.${target}`).attr('data-base');
		var value = parseInt($(`.${target}`).html(), base);
		value = value + 1;
		console.log(value);
		$(`.${target}`).html(value.toString(base));
	});


	$('.nullify').click(function() {
		var target = $(this).attr('data-target');
		$(`.${target}`).html(0);
	});

	$('.powerInput').change(function(){
		var target = $(this).attr('data-target');
		var base = $(this).attr('data-base');
		var value = $(this).val();
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
