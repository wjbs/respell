$().ready(function(){
    TextToIPA.loadDict('./ipadict.txt');
    $.getJSON("./foenemes.json", function( data ) {
        Window.phonemes = data["phonemes"];
        Window.phonemeDict = data["phonemeDict"];
    });
});

function englishToIpa(english) {
    var ipa = TextToIPA.lookup(english.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' '));
    if (ipa.error === null) {
        return ipa.text;
    }
    else if (ipa.error === "multi") {
        var ipas = ipa.text.split(" OR ")
        return ipas[Math.floor(Math.random() * ipas.length)];
    }
    else {
        setRespell("Error getting IPA from word " + english + ": " + ipa.error.toString());
        return null;
    }
}

function setRespell(respelling) {
    $("#out").html(respelling);
}

function pickSpelling(phn) {
    var spellings = Window.phonemeDict[Window.phonemes[phn]];
    spellings = spellings.filter(s => s[0].indexOf(".") === -1);
    var spelling = spellings[Math.floor(Math.random() * spellings.length)];
    return spelling;
}

function processIpa(ipa) {
    ipa = ipa.replace("a", "ɑ")
    return ipa;
}

function ipaRespell(ipa) {
    ipa = processIpa(ipa)
    for (i = 0; i < Window.phonemes.length; i++) {
        var p = Window.phonemes[i]
        ipa = ipa.replaceAll(p, "{"+ i.toString() + "}");
    }
    var phns = ipa.match(/\d+(?=})/g);
    console.log("Missing ipa of <" + ipa + "> is <" + ipa.replace(/{\d+}/g, ""));
    phns = phns.map(phn => pickSpelling(phn));
    var respelling = phns.reduce((acc, curr) => acc + curr[0], "");
    phns.forEach(phn => respelling = respelling + "<br>" + phn[0] + " as in " + phn[1])
    return respelling
}

function convertWord() {
    var word = $("#word-in").val();
	wikProcess(word);
	return;
    var ipa = englishToIpa(word)
    if (ipa !== null) {
        var respelling = ipaRespell(ipa);
        setRespell(respelling);
    }
}


function convertIpa() {
    var ipa = $("#ipa-in").val();
    var respelling = ipaRespell(ipa);
    setRespell(respelling);
}

function setHeader(xhr) {
    xhr.setRequestHeader('Origin', "https://wjbs.github.com");
}

function wikProcess(word) {
	url = "https://en.wiktionary.org/w/api.php?action=query&prop=revisions&titles=" + word +"&rvslots=*&rvprop=content&formatversion=2&format=json"
	
	$.ajax({
		url: url,
		type: 'GET',
		crossDomain: true,
		dataType: 'jsonp',
		success: function(data) { parsePageToIpa(data.query.pages[0].revisions[0].slots.main.content); },
		error: function() {},
		beforeSend: setHeader
	});
}

function parsePageToIpa(text) {
	try {
		var str = text.match(/(?:IPA\|en\|\/).+?(?:\/)/g)[0];
	}
    catch {
        setRespell("Oops, something went wrong! Check for the correct capitalizaiton (lowecase for non-proper nouns), make sure the word is singular rather than plural, and of course check spelling!");
    	return;
	}
	var idx = str.indexOf("/");
	var ipa = str.substr(idx+1, str.length-idx-2)
	if (ipa !== "") {
        var respelling = ipaRespell(ipa);
        setRespell(respelling);
    }
}

