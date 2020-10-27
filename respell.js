$().ready(function(){
    TextToIPA.loadDict('./ipadict.txt');
    $.getJSON("./foenemes.json", function( data ) {
        Window.phonemes = data["phonemes"];
        Window.phonemeDict = data["phonemeDict"];
    });
});

function englishToIpa(english) {
    return TextToIPA.lookup(english.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' '));
}

function setRespell(respelling) {
    $("#out").text(respelling);
}

function pickSpelling(phn) {
    var spellings = Window.phonemeDict[Window.phonemes[phn]];
    spellings = spellings.filter(s => s[0].search(".") === -1);
    var spelling = spellings[Math.floor(Math.random() * spellings.length)];
    return spelling;
}

function ipaRespell(ipa) {
    for (i = 0; i < Window.phonemes.length; i++) {
        ipa = ipa.replace(Window.phonemes[i], "{i}");
    }
    var phns = ipa.match(/\d+(?=})/g);
    phns.foreach(phn => pickSpelling(phn));
    var respelling = phns.reduce((acc, curr) => acc + curr, "");
    phns.foreach(phn => respelling = respelling + "\n" + phn[0] + " as in " + phn[1])
    return respelling
}

function convertWord() {
    alert("convertWord");
    var word = $("#word-in").text();
    var respelling = ipaRespell(englishToIpa(word));
    setRespell(respelling);
}


function convertIpa() {
    alert("convertIpa");
    var ipa = $("#ipa-in").text();
    var respelling = ipaRespell(ipa);
    setRespell(respelling);
}
