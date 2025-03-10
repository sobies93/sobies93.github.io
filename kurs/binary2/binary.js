// Generowanie tabeli z 1024 imionami
const numbersList = document.querySelector('.numbersList');
const searchName = 'Janek';
const polishNames = [
  "Adam", "Adrian", "Agata", "Agnieszka", "Aleksander", "Aleksandra", "Alicja", "Amelia", "Andrzej", "Aneta", "Angelika", "Anna", "Antoni", "Barbara", "Bartłomiej", "Beata", "Błażej", "Bogdan", "Bogumiła", "Bożena", "Cezary", "Damian", "Daniel", "Danuta", "Dariusz", "Dawid", "Dominik", "Dominika", "Dorota", "Edyta", "Elżbieta", "Emilia", "Eryk", "Ewa", "Filip", "Franciszek", "Gabriel", "Gabriela", "Grzegorz", "Halina", "Hanna", "Helena", "Henryk", "Hubert", "Iga", "Igor", "Ilona", "Irena", "Iwona", "Izabela", "Jakub", "Jan", "Janina", "Janusz", "Jarosław", "Joanna", "Jolanta", "Julia", "Julian", "Justyna", "Kacper", "Kamila", "Karina", "Karol", "Karolina", "Katarzyna", "Kazimierz", "Kinga", "Klaudia", "Kornelia", "Krzysztof", "Ksawery", "Laura", "Leszek", "Liliana", "Lucyna", "Ludwik", "Łukasz", "Maciej", "Magdalena", "Maja", "Maksymilian", "Malwina", "Marek", "Maria", "Marian", "Marianna", "Mariusz", "Marta", "Martyna", "Marzena", "Mateusz", "Małgorzata", "Michał", "Michalina", "Milena", "Monika", "Natalia", "Nina", "Norbert", "Oktawia", "Olga", "Oliwia", "Paweł", "Patrycja", "Patryk", "Paulina", "Piotr", "Przemysław", "Rafał", "Regina", "Renata", "Roksana", "Roman", "Ryszard", "Sebastian", "Stanisław", "Stefan", "Sylwia", "Szymon", "Tadeusz", "Tamara", "Tomasz", "Urszula", "Weronika", "Wiesław", "Wiktor", "Wiktoria", "Wioletta", "Władysław", "Zbigniew", "Zofia", "Zuzanna"
];

// Uzupełniamy listę do 1024 imion losowymi wyborami z powyższej listy
const names = Array.from({ length: 1024 }, (_, i) => i === 512 ? searchName : polishNames[Math.floor(Math.random() * polishNames.length)]);
names.sort(); // Sortujemy listę imion dla wyszukiwania binarnego

// Wyświetlanie tabeli z ukryciem wszystkich wierszy na początku
tableRows = names.map((name, index) => {
  return `<tr style="display: none;" data-index="${index}"><td>${index + 1}</td><td>${name}</td></tr>`;
}).join('');
numbersList.innerHTML = tableRows;

// Funkcja obsługi sprawdzania wiersza
function checkRow() {
  const input = document.querySelector('input').value;
  const userRow = parseInt(input, 10) - 1;

  if (isNaN(userRow) || userRow < 0 || userRow >= names.length) {
    alert('Wprowadź poprawny numer wiersza (1-1024).');
    return;
  }

  // Pokaż wiersz tabeli o danym indeksie
  const row = document.querySelector(`tr[data-index="${userRow}"]`);
  if (row) {
    row.style.display = "table-row";
    if (names[userRow] === searchName) {
      row.style.backgroundColor = "lightgreen"; // Ustawienie koloru zielonego
    }
  }
}

// Obsługa przycisku
const button = document.querySelector('button');
button.addEventListener('click', checkRow);

// Obsługa klawisza Enter
document.querySelector('input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkRow();
  }
});


// /**
//  * code below is so wrong. I'm ashamed.
//  */

// var names = [
// 	"",
// 	"Adamczyk",
// 	"Baran",
// 	"Chmielewski",
// 	"Dąbrowski",
// 	"Ejsmont",
// 	"Filipiak",
// 	"Grabowski",
// 	"Hajduk",
// 	"Iwański",
// 	"Jankowski",
// 	"Kowalski",
// 	"Lewandowski",
// 	"Mazur",
// 	"Nowak",
// 	"Olszewski",
// 	"Pawłowski",
// 	"Rutkowski",
// 	"Szymański",
// 	"Tomaszewski",
// 	"Urbański",
// 	"Wiśniewski",
// 	"Zieliński"
// ]

// $(function() {
// 	// showByUser();
// 	// showByComputer();
// 	$(".showByUser").click(function() {
// 		showByUser()
// 	})
// });

// var showByUser = function() {
// 	$(".byUser").prop('hidden', false)
// 	prepareSearch('byUser')
// 	$(".byUser .startSearch").click(function() {
// 		performSearch('byUser', function(){
// 			disableByUser();
// 			showSumUp();
// 		});
// 	});
// }

// var showSumUp = function() {
// 	$(".sumUp").prop('hidden', false)
// 	$('html, body').animate({
//         scrollTop: $(".byUser .counter").offset().top
//     }, 1024);
// 	$(".showByComputer").click(function() {
// 		showByComputer();
// 	});
// 	$(".againByUser").click(function() {
// 		searchAgain('byUser');
// 	})
// }

// var searchAgain = function(byWho) {
// 	prepareSearch(byWho);
// 	performSearch(byWho, disableByUser);
// }

// var disableByUser = function() {
// 	console.log("disableByUser");
// 	$(".byUser .number").off("click");
// }

// var showByComputer = function() {
// 	$(".byComputer").prop('hidden', false)
// 	$('html, body').animate({
//         scrollTop: $(".byComputer").offset().top
//     }, 1000);
// 	prepareSearch('byComputer')
// 	$(".byComputer .startSearch").click(function() {
// 		performSearch('byComputer');
// 	});
// }

// var setCounter = function(counter, target) {
// 	$(target).text(counter)
// }

// var random = function(min, max) {
// 	max = max - min;
// 	return Math.floor((Math.random() * max) + min + 1);
// }

// var appendNumbers = function(numbers, target) {
// 	$(target).html('')
// 	$.each(numbers, function(index, number) {
//         var $tr = $('<tr>').attr("data-index", index).addClass('number').append(
//             $('<td>').text(index + 1),
//             $('<td>').append($('<span>').text(names[number]).prop('hidden', true))
//         ).appendTo(target);
//     });
// }

// var prepareNumbers = function() {
// 	var number_of_rows = 20;
//  	var max = 20;
//  	var place_for_10 = random(0, number_of_rows - 1)
//  	var numbers = [10];
//  	for(i = 0;i < number_of_rows - 1; i++) {
//  		if(i < place_for_10) {
//  			numbers.push(random(1, 9))
//  		} else {
//  			numbers.push(random(11, max))
//  		}
//  	}
//  	return _.sortBy(numbers);
// }

// var prepareSearch = function(mode) {
// 	var mainClass = '.' + mode + ' ';
// 	appendNumbers(prepareNumbers(), mainClass + '.numbersList');
// }

// var performSearch = function(mode, onFinish) {
//     var mainClass = '.' + mode + ' ';
//     var counter = 0;
//  	setCounter(counter, mainClass + ".counter");

//  	$(mainClass + ".startSearch").prop("hidden", true);
//  	$(mainClass + ".counter").prop("hidden", false);
// 	if(mode === 'byUser') {
// 		$(mainClass + ".number").click(function() {
// 			if(!$(this).hasClass("active")) {
// 				counter = counter + 1;
// 				setCounter(counter, mainClass + ".counter");
// 				var index = $(this).attr("data-index");
// 				if(clickNumber(index, mainClass) === 10) {
// 					onFinish();
// 				}
// 			}
// 		});
//  	};
//  	if(mode === 'byComputer') {
// 		var notFound = true;
// 		var start = 0;
// 		var end = 20;
// 		binary(start, end, 0, mainClass).then(function(){
// 			showSearchAgainByComputer();
// 		});
//  	}
// }

// var showSearchAgainByComputer = function() {
// 	$(".searchAgainByComputer").prop('hidden', false);
// 	$(".searchAgainByComputer").click(function(){
// 		$(".searchAgainByComputer").prop('hidden', true);
// 		searchAgain('byComputer')
// 	})
// }

// var binary = function(start, end, counter, mainClass) {
// 	return new Promise(function(resolve, reject) {
// 		setTimeout(function(){
// 			counter = counter + 1;
// 			setCounter(counter, mainClass + ".counter");
// 			var index = Math.ceil(start + (end - start) / 2);

// 			var number = clickNumber(index - 1, mainClass);

// 			if(number < 10) {
// 				start = index;
// 				binary(start, end, counter, mainClass).then(function(){
// 					resolve();
// 				});
// 			} else if (number > 10) {
// 				end = index;
// 				console.log(start, end);
// 				binary(start, end, counter, mainClass).then(function(){
// 					resolve();
// 				});
// 			} else {
// 				resolve();
// 			}
// 		}, 300);
// 	});
// };

// var clickNumber = function(index, mainClass) {
// 	var $numberRow = $(mainClass + '*[data-index="' + index + '"]')
// 	$numberRow.addClass("table-active");
// 	$numberRow.find("span").prop("hidden", false);
// 	var name = $numberRow.find("span").text();
// 	var number = names.indexOf(name)
// 	console.log(number, name);
// 	if( number === 10) {
// 		$numberRow.addClass("table-success");
// 	}
// 	return number;
// }
