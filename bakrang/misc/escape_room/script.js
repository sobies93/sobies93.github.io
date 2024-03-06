$(document).ready(function() {
    $('button').click(function() {
        var answer = $('input[type="text"]').val();

        if (answer === "8163") {
            $('.message-container').text('Answer is ').css('color', 'green');
        } else {
            $('.message-container').text('Answer is ').css('color', 'red');
        }
    });
});