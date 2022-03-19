let wordLink = "https://wmtmky.github.io/minis/allowed-words.txt";
let wordList;

window.onload = function () {
    getWords();


}

function getWords() {
    fetch(wordLink)
    .then(response => console.log(response.json()))
    
}