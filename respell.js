$().ready(function() {alert("ready in respell.js");});

$().ready(function() {TextToIPA.loadDict('./ipadict.txt');});

$().ready(function(){
    $.getJSON( "/foenemes.json", function( data ) {
    Window.phonemes = data[phonemes];
    Window.phonemeDict = data[phonemeDict];
    $("#out").html("test");
  });
});

funciton convertWord() {
    alert("convertWord");
}


funciton convertIpa() {
    alert("convertWord");
}
