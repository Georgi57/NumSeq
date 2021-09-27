/*
Written by Georgi Olentsenko for NumSeq project
Started 2021-09-27
*/

var running = false;

function button_start_stop()
{
	if (running) {
		running = false;
		document.getElementById("button_start_stop").innerHTML = "Start";
	}
	else {
		running = true;
		document.getElementById("button_start_stop").innerHTML = "Stop";
	}
}