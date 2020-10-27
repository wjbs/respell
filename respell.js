$().ready(function() {alert("ready in respell.js");});

$().ready(function() {TextToIPA.loadDict('./ipadict.txt');});

$().ready(function(){
        $.getJSON( "/foenemes.json", function( data ) {
        Window.phonemes = data[phonemes];
        Window.phonemeDict = data[phonemeDict];
        $("#out").html("test");
    });
});

function englishToIpa(english) {
    return TextToIPA.lookup(englishTextArray[i].toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' '));
}

funciton convertWord() {
    alert("convertWord");
    var word = $("word-in").text();
    alert(word);
}


funciton convertIpa() {
    alert("convertIpa");
    var ipa = $("word-in").text();
    alert(ipa);
}
