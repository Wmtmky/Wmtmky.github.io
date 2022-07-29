// Change header options depending on nav selection
function toggleHeader(ID) {
    document.querySelectorAll('header > div').forEach(headerDiv => headerDiv.classList.add('hidden'));
    document.getElementById(ID + "-options").classList.remove('hidden');
    document.querySelectorAll('nav > div').forEach(navDiv => navDiv.classList.remove('selected-header'));
    document.getElementById(ID).classList.add('selected-header');
}

let editModeEnabled = false;
// keyboard shortcuts
window.addEventListener("keydown", function(e){
    if (e.isComposing || editModeEnabled) return;
    switch (e.code) {
        case "KeyL":
            toggleHeader("load");
            break;
        case "KeyV":
            toggleHeader("view");
            break;
        case "KeyE":
            toggleHeader("edit");
            break;
        case "Space":
            changeSide();
            break;
        case "ArrowLeft":
            changeCard("left");
            break;
        case "ArrowRight":
            changeCard("right");
            break;
    }
}, false)

// Detect file upload
document.getElementById("load-file").addEventListener("change", loadFile, false);
function loadFile(e) {

    // adjacent label text
    let loadFileText = document.getElementById("load-file-text");
    let loadedFile = e.target.files[0];

    // only json files valid in onchange target (= input element)
    if(!loadedFile.type.includes("json")) {
        loadFileText.innerText = loadedFile.name + " is not a valid json file";
        flashError();
        return;
    }

    // read file as text
    let fr = new FileReader();
    fr.onload = openFlashcards;
    fr.readAsText(loadedFile);
    
    // success message
    loadFileText.innerText = "Loaded " + loadedFile.name;
}

flashcards = [];
let card = document.getElementById("card");
function openFlashcards(e) {
    
    flashcards = JSON.parse(e.target.result);

    displayCard(1, 1);

    toggleHeader("view");
}

// visible error feedback
function flashError() {
    card.style.transitionDuration = "0";
    card.style.backgroundColor = "#f88";
    setTimeout( function() {
        card.style.transitionDuration = "0.2s";
        card.style.backgroundColor = "white";
    }, 100);
    setTimeout( function() {
        card.style.transitionDuration = "0";
    }, 300);
}

// show one side of the card
let currentCard = 1;
let currentSide = 1;
let cardCount = 1;
let sideCount = 1;
function displayCard(cardNo, sideNo) {
    cardNo--; sideNo--;
    // check if card & side exists
    if (flashcards?.[cardNo]?.[sideNo] == undefined) {
        flashError();
        return;
    }
    currentCard = cardNo + 1;
    currentSide = sideNo + 1;
    cardCount = flashcards.length;
    sideCount = flashcards[cardNo].length;

    card.replaceChildren();
    for (let i = 0; i < 6 && i < flashcards[cardNo][sideNo].length; i++) {
        let h = document.createElement('h' + (i + 1));
        h.innerHTML = flashcards[cardNo][sideNo][i];
        card.appendChild(h);
    }

    document.getElementById('card-number').innerText = currentCard;
    document.getElementById('card-total').innerText = cardCount;
    document.getElementById('side-number').innerText = currentSide;
    document.getElementById('side-total').innerText = sideCount;

}

// change side of the card
function changeSide(sideNo) {

    if (sideNo == null) {
        if (currentSide + 1 > sideCount) {
            displayCard(currentCard, 1);
        } else {
            displayCard(currentCard, currentSide + 1);
        }
        return;
    }

    if (sideNo == "left") sideNo = currentSide - 1;
    if (sideNo == "right") sideNo = currentSide + 1;
    if (!Number.isSafeInteger(sideNo)) return;

    displayCard(currentCard, sideNo);
    
}

// change card
function changeCard(cardNo) {
    if (cardNo == "left") cardNo = currentCard - 1;
    if (cardNo == "right") cardNo = currentCard + 1;
    if (!Number.isSafeInteger(cardNo)) return;
    displayCard(cardNo, 1);
}

// handle numeric inputs from view options
document.getElementById("side-number").addEventListener('input', function (e) {
    if(isNaN(e.target.innerText)) {
        e.preventDefault;
        return;
    }
    changeSide(Number.parseInt(e.target.innerText));
})
document.getElementById("card-number").addEventListener('input', function (e) {
    if(isNaN(e.target.innerText)) {
        e.preventDefault;
        return;
    }
    changeCard(Number.parseInt(e.target.innerText));
})

function toggleEditMode() {
    editModeEnabled = editModeEnabled ? false : true;
    if (editModeEnabled) {
        
    }
}
