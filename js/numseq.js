/*
Written by Georgi Olentsenko for NumSeq project
Started 2021-09-27
*/

// State of the app
var check_seq = false;
var reverse_check = false;
var congratulate = false;
var inc_len = true;

var numseq = "";
var numseq_length = 4;
var numseq_index = 20;

// Initialize new SpeechSynthesisUtterance object
let speech = new SpeechSynthesisUtterance();
var speaking = false;
var speech_length = 0;

// Generate a new number sequence for the memory training
function generate_numseq() {
	numseq = "";
	for (let i = 0; i < numseq_length; i++) {
		numseq = numseq + Math.floor(Math.random() * 10);
	}
	check_seq = true;
	
	speech_length = 0;
	numseq_index = 0;
	if (document.getElementById("number_of_digits_checkbox").checked) {
		document.getElementById("number_of_digits_input").value = numseq_length;
	}
	speech.text = numseq[numseq_index];
	speaking = true;
	window.speechSynthesis.speak(speech);
}

speech.addEventListener('end', function(event) {
  speech_length += event.elapsedTime;
  numseq_index += 1;
  
  if (numseq_index >= numseq_length) {
		speaking = false;
		console.log('It took ' + speech_length +
		' seconds to utter the number sequence');
  } else {
		speech.text = numseq[numseq_index];
		speaking = true;
		window.speechSynthesis.speak(speech);
  }
});

// Manages the settings checkboxes
function settings() {
	// Set whether to increment sequence length on success
	if (document.getElementById("reverse").checked) {
		reverse_check = true;
	} else {
		reverse_check = false;
	}
	
	// Set number of digits if it is different
	if (document.getElementById("number_of_digits_input").value != "X" ||
		document.getElementById("number_of_digits_input").value != numseq_length) {
		numseq_length = Number(document.getElementById("number_of_digits_input").value);
	}
	
	// Set whether to see or not the number of digits
	if (document.getElementById("number_of_digits_checkbox").checked) {
		document.getElementById("number_of_digits_input").value = numseq_length;
	} else {
		document.getElementById("number_of_digits_input").value = "X";
	}
	
	// Set whether to congratulate you if you enter the sequence correctly
	if (document.getElementById("congratulate").checked) {
		congratulate = true;
	} else {
		congratulate = false;
	}
	
	// Set whether to increment sequence length on success
	if (document.getElementById("inc_len").checked) {
		inc_len = true;
	} else {
		inc_len = false;
	}
	return false;
}

// Function to check the sequence you enter
function check_numseq() {
	// Check whether test is in progress
	if (check_seq) {
		// Get the input sequence
		var numseq_input = document.getElementById("numseq_input").value;
		console.log(numseq + " vs " + numseq_input + " (last one yours)");
		// Show differences in sequence if any
		document.getElementById('correct_numseq').innerHTML = '';
		var success = true;
		for (var i = 0; i < numseq_length; i++) {
			var j = i;
			if (reverse_check) j = numseq_length - i - 1;
			if (numseq[i]==numseq_input[j]) {
				document.getElementById('correct_numseq').innerHTML +=
					'<a style="background-color: #98e698">'+numseq[i]+'</a>';
			} else {
				document.getElementById('correct_numseq').innerHTML +=
					'<a style="background-color: #ff3333">'+numseq[i]+'</a>';
				success = false;
			}
		}
		// If the input is correct
		if (success) {
			console.log('Correct sequence!');
			if (congratulate) {
				speech.text = "Well done!";
				window.speechSynthesis.speak(speech);
			}
			// Increment sequence length if set to do so
			if (inc_len) {
				console.log(numseq_length);
				numseq_length = Number(numseq_length) + 1;
				console.log(numseq_length);
			}
		}
		document.getElementById("btn_ctrl").innerHTML = "Listen";
		check_seq = false;
	} else {
		// Clear form input
		document.getElementById("numseq_input").value = "";
		document.getElementById("correct_numseq").innerHTML = "";
		document.getElementById("btn_ctrl").innerHTML = "Check";
		// Start anew if sequence is already checked or none there
		generate_numseq();
	}
}