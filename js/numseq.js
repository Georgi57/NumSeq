/*
Written by Georgi Olentsenko for NumSeq project
Started 2021-09-27
*/

// State of the app
var running = false;
var check_sequence = false;
var congratulate = false;

var number_sequence = "";
var number_sequence_length = 4;
var number_sequence_index = 20;
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
	}
}

// Generate a new number sequence for the memory training
function generate_number_sequence() {
	number_sequence = "";
	for (let i = 0; i < number_sequence_length; i++) {
		number_sequence = number_sequence + Math.floor(Math.random() * 10);
	}
	check_sequence = true;
	
	speech_length = 0;
	number_sequence_index = 0;
	speech.text = number_sequence[number_sequence_index];
	speaking = true;
	window.speechSynthesis.speak(speech);
}

speech.addEventListener('end', function(event) {
  speech_length += event.elapsedTime;
  number_sequence_index += 1;
  
  if (number_sequence_index >= number_sequence_length) {
		speaking = false;
		console.log('It took ' + speech_length + ' seconds to utter the number sequence');
  } else {
		speech.text = number_sequence[number_sequence_index];
		speaking = true;
		window.speechSynthesis.speak(speech);
  }
});

// Manages the settings checkboxes
function settings() {
	//  Set whether to see or not the number of digits
	if (document.getElementById("number_of_digits_checkbox").checked) {
		document.getElementById("number_of_digits").innerHTML = number_sequence_length;
	} else {
		document.getElementById("number_of_digits").innerHTML = "X";
	}
	
	// Set whether to congratulate you if you enter the sequence correctly
	if (document.getElementById("congratulate").checked) {
		congratulate = true;
	} else {
		congratulate = false;
	}
}

// Function to check the sequence you enter
function check_number_sequence() {
	// Check whether test is in progress
	if (check_sequence) {
		// Compare the generated and input sequence
		var number_sequence_input = document.getElementById("number_sequence_input").value;
		console.log(number_sequence + " vs " + number_sequence_input + " (last one yours)");
		console.log();
		if (number_sequence == number_sequence_input) {
			console.log('Correct sequence!');
			if (congratulate) {
				speech.text = "Well done!";
				window.speechSynthesis.speak(speech);
			}
		}
		// Show differences in sequence if any
		document.getElementById('correct_number_sequence').innerHTML = '';
		for (var i = 0; i < number_sequence_length; i++) {
			if (number_sequence[i]==number_sequence_input[i]) {
			document.getElementById('correct_number_sequence').innerHTML +=
				'<a style="background-color: #98e698">'+number_sequence[i]+'</a>';
			} else {
				document.getElementById('correct_number_sequence').innerHTML +=
				'<a style="background-color: #ff3333">'+number_sequence[i]+'</a>';
			}
		}
		check_sequence = false;
	} else {
		// Start anew if sequence is already checked or none there
		generate_number_sequence();
		// Clear form input
		number_sequence_input = document.getElementById("number_sequence_input").value = "";
	}
}