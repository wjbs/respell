## Respell
Enter an english word:
</input id="word-in">

<button id="convert-word">Convert</button>


Alternatively, directly enter IPA in unicode:
</input id="ipa-in">

<button id="convert-ipa">Convert</button>


The respelling:
<div id="wout"></div>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="./text-to-ipa.js"></script>
<script src="./converter-form.js"></script>

<script src="/respell.js"></script>


<script>
  alert("js");
  $().ready(function() {
  $("#word-out").html("test <i> test</i>")
  });
</script>

