/*
Written by Georgi Olentsenko for NumSeq project
Started 2021-09-27
*/

// State of the app
var running = false;

var number_sequence = "";
var number_sequence_length = 4;
var number_sequence_index = 0;
var number_of_digits_tickbox = document.querySelector('input[id="number_of_digits"]');

// Initialize new SpeechSynthesisUtterance object
let speech = new SpeechSynthesisUtterance();
var speaking = false;
var speech_length = 0;

function button_start_stop()
{
	if (running) {
		running = false;
		document.getElementById("button_start_stop").innerHTML = "Start";
	}
	else {
		running = true;
		document.getElementById("button_start_stop").innerHTML = "Stop";
		
		generate_number_sequence();
		
		speech_length = 0;
		number_sequence_index = 0;
		speech.text = number_sequence[number_sequence_index];
		speaking = true;
		window.speechSynthesis.speak(speech);
	}
}

speech.addEventListener('end', function(event) {
  speech_length += event.elapsedTime;
  number_sequence_index += 1;
  
  if (number_sequence_index == number_sequence_length) {
		speaking = false;
		console.log('It took ' + speech_length + ' seconds to utter the number sequence');
  } else {
		speech.text = number_sequence[number_sequence_index];
		speaking = true;
		window.speechSynthesis.speak(speech);
  }
});


function generate_number_sequence() {
	number_sequence = "";
	for (let i = 0; i < number_sequence_length; i++) {
		number_sequence = number_sequence + Math.floor(Math.random() * 10);
	}
	document.getElementById("correct_number_sequence").innerHTML = number_sequence;
}

function show_number_of_digits() {
	if (document.getElementById("number_of_digits_checkbox").checked) {
		document.getElementById("number_of_digits").innerHTML = number_sequence_length;
	} else {
		document.getElementById("number_of_digits").innerHTML = "X";
	}
}

function check_number_sequence() {
	console.log('Checking number sequence');
}