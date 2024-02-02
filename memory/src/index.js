import _ from 'lodash';
import $ from "jquery";
import dictionary from "./dictionary"

const debug = false;

const debug_dictionary = {
    debug: {
		one: 'jeden',
		two: 'dwa',
	},
}

if(debug) {
    dictionary = debug_dictionary;
}

$(function() {
	start();
});

const start = () => {
	const url = new URL(window.location.href);
	let type  = url.searchParams.get('type');
	if (type) {
		start_game(type);
	} else {
		select();
	}
}

const select = () => {
	const select_buttons = _.reduce(_.keys(dictionary), (accumulator, name) => {
		accumulator += `<div class="m-2 col-xs-12">
			<button class='btn btn-primary btn-block selectType' data-type="${name}">
				${name}
			</button>
		</div>`
		return accumulator
	}, '');
	$('#select').html(select_buttons);
	$('.selectType').click(function() {
		$('#select').hide();
		start_game($(this).attr('data-type'));
	});
}

/**
 * parse_words
 * @param  { one:'jeden', two:'dwa'}
 * @return [{key: 'one', value: 'one'}, {key: 'one', value: 'jeden'}, {key: 'two', value: 'two'}, {key: 'two', value: 'dwa'}]
 */
const parse_words = (input) =>
	_.reduce(input, (accumulator, value, key) => {
		accumulator.push({
			key,
			value,
		});

		accumulator.push({
			key,
			value: key,
		})
		return accumulator;
	}, []);

let co_op = false;
const single_player = true;

const finish = () => {
	$('#header').addClass('bg-success');
}

const update_score_display = (active_player, score_array, number_of_moves) => {
    const label = single_player 
        ? 'Number of moves'
        : 'Player 1'
const result = single_player 
    ? number_of_moves
    : score_array[0];

	$(`#player0`).html(`${label}:
		<br>
		${result}`);
	if(!single_player) {
        $(`#player1`).html(`Player 2:
		<br>
		${score_array[1]}`);
    }
	$(`#player0`).removeClass('active');
	$(`#player1`).removeClass('active');

	$(`#player${active_player}`).addClass('active');
    // $(`#player0`).html(`<img src=>`);
}



const start_game = function(type) {
	const words = dictionary[type];
	let timeout_animation = 0;
	let previous_index = null;
	let current_index;
	let player = 0;
	let score = [0, 0];

	let guessed = [...Array(_.keys(words).length * 2)].map(x => 0);

	generateBoard(parse_words(words));
	generateList(words);

    let click = 0;

    if (!co_op) {
 		update_score_display(player, score, click / 2);
	}


	$('.game-card').click(function(){
		current_index = $(this).attr('id');
		if(!timeout_animation && current_index != previous_index && !guessed[current_index]) {
			click = click + 1;
			let current = $(this);
			current.addClass('table-active')
			current.find('.cardSpan').show();
			if (click % 2 === 1) {
				previous_index = current_index;
			} else {
				let previous = $('#' + previous_index);
				if (previous.attr('data-card_key') === current.attr('data-card_key')) {
					current.addClass('table-success');
					previous.addClass('table-success');
					guessed[current_index] = 1;
					guessed[previous_index] = 1;
					if(_.every(guessed)) {
						finish();;
					}
					score[player] = score[player] + 1;
					if (!co_op) {
						update_score_display(player, score, click / 2);
                    }
				} else {
					timeout_animation = 1;
					setTimeout(() => {
						current.removeClass('table-active');
						current.find('.cardSpan').hide();
						previous.removeClass('table-active');
						previous.find('.cardSpan').hide();
						previous_index = null;
						timeout_animation = 0;
                        if(!single_player) {
                            player = (player + 1) % 2;
                        }
						if (!co_op)
							update_score_display(player, score, click / 2);
					}, 2500)
				}
			}
		}

	})

};

var generateBoard = function(doubled_words) {
	const default_row_length = 10;
	const shuffled_words = _.shuffle(doubled_words);
	const rows = _.chunk(shuffled_words, default_row_length);
	let index = 0;
	const blank = "<td class='table-dark'></td>";
	$('.memoryBoard').html(
		_.reduce(rows, (accumulator, row) => {
			let blanks = '';
			let diff = default_row_length - row.length;
			if (diff) {
				blanks = [...Array(diff / 2)].map(x => blank).join('');
			}
			let row_html = _.reduce(row, (deep_accumulator, card) => {
                const content = card.value.includes('.')
                    ? `<img src="./images/${card.value}" height="150"/>`
                    : card.value;
				deep_accumulator += `<td class='game-card' data-card_key="${card.key}" id="${index}"'>
					<span>${index}</span><br />
					<span class="cardSpan">${content}</span>
				</td>`
				index = index + 1;
				return deep_accumulator;
			}, '');
			return accumulator + `<tr>${blanks}${row_html}${blanks}</tr>`;
		}, '')
	);
	$('.cardSpan').hide();
};

var generateList = function(words_pairs) {
	$('.wordList').html(
		_.reduce(words_pairs, (accumulator, lang, translation) => {
                const content = lang.includes('.')
                ? `<img src="./images/${lang}" height="150"/>`
                : lang;
				accumulator += `<tr>
					<td>
						${content}
					</td>
					<td>
						${translation}
					</td>
				</tr>`
			return accumulator;
		}, '')
	);
};

if (module.hot) {
	module.hot.accept('.', () => {
		start();
	});
}
