let recognition;
let isRecognizing = false;

//hide icon initially
$('#playIcon').hide()

//checking is support in browser
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'bn-BD';

  recognition.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript + " ";
    }
    $('#output-text').val($('#output-text').val() + transcript);
  };

//auto restart
  recognition.onend = function () {
    if (isRecognizing) {
      recognition.start();
    }
  };
}


//start recording
$('#start-btn').click(function() {
  if (!isRecognizing) {
    recognition.start();
    $('#viewIcon').hide()
    $('#playIcon').show()
    isRecognizing = true;
  }
});


//stop recording 
$('#stop-btn').click(function() {
  if (isRecognizing) {
    recognition.stop();
    $('#playIcon').hide()
    $('#viewIcon').show()
    isRecognizing = false;
  }
});


//copy text
$('#copy-btn').click(function(){
    $('#output-text').select()
    document.execCommand('copy');
});


//clear textarea 
$('#clear-btn').click(function(){
  $('#output-text').val(" ");
});