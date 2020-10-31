# respell
### Respell English Words with Ckreeytive Foughneticks

This program is designed for Github Pages and as such is not really structured for use outside of that domain. To see it in action, visit [https://wjbs.github.io/respell/](https://wjbs.github.io/respell/ "Respell English Words with Ckreeytive Foughneticks")

To respell a word, the program first queries [wiktionary.org](https://wiktionary.org) for an entry for the entered word. If such an entry exists, the program attempts to find within that entry the IPA (international phonetic alphabet) spelling of the word, which represents the pronunciation the word (for example, "spelling" in IPA is "ˈspɛlɪŋ"). Then, it uses a filtered version of the list of english spellings for different sounds (from [wikipedia](https://en.wikipedia.org/wiki/English_orthography#Sound-to-spelling_correspondences "English Orthography")) to assign to each sound from the IPA spelling a randomly selected spelling. Then, it simply prints the full word along with where each chunk some from.

Also, as a byproduct of using wiktionary, the program can differentiate between proper and improper nouns: for example, "nice" (as in kind) is interpreted differently from "Nice" (as in the city in France).
