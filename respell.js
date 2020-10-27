$().ready(function() {alert("ready in respell.js");});

$().ready(function() {TextToIPA.loadDict('./ipadict.txt');});

$().ready(function(){
    $.getJSON( "/foenemes.json", function( data ) {
    Window.phonemes = data[phonemes];
    Window.phonemeDict = data[phonemeDict];
    $("#text").html(data["text"]);
  });
});
