var input = {
    mentors: new Object(),
    mentees: new Object()
}
var output = {
    mentors: new Object(),
    mentees: new Object()
}

document.querySelectorAll('textarea').forEach(elem => elem.addEventListener('change', saveInput));

function saveInput(e) {
    e.target.value.split('\n').forEach((name) => {if(/\w/.test(name)) input[e.target.id][name] = new Array(3)});
    let count = Object.keys(input[e.target.id]).length;
    document.getElementById(e.target.id + "-count").innerText = "Detected " + count;
    document.getElementById(e.target.id + "-count-recap").innerText = count;
    console.log(input);
}


document.querySelector('#list-confirm').addEventListener('click', choicesInput);

function choicesInput() {

    let inputTypes = Object.keys(input);
    for(let i = 0; i < inputTypes.length; i++) {
        let section = document.getElementById(inputTypes[i] + "-choices");
        section.replaceChildren();

        for(let member of Object.keys(input[inputTypes[i]])) {
            let memberDiv = document.createElement('div');
            memberDiv.classList.add('member')
            let memberName = document.createElement('div');
            memberName.innerText = inputTypes[i] + ": Top Choices for " + member;
            let orderedList = document.createElement('ol');

            for(let j = 0; j < 3; j++) {
                let listItem = document.createElement('li');
                let choiceSelector = document.createElement('select');
                choiceSelector.setAttribute('onchange','makeChoice("' + inputTypes[i] + '","' + member + '","' + j + '",this.value)')

                for(let choice of Object.keys(input[inputTypes[(i + 1) % inputTypes.length]])) {
                    let choiceElem = document.createElement('option');
                    choiceElem.innerText = choice;
                    choiceSelector.appendChild(choiceElem);
                }
                let defaultChoice = document.createElement('option');
                defaultChoice.setAttribute('disabled',true)
                defaultChoice.setAttribute('selected',true)
                defaultChoice.setAttribute('value',"")
                defaultChoice.innerText = "select";
                choiceSelector.appendChild(defaultChoice);

                listItem.appendChild(choiceSelector);
                orderedList.appendChild(listItem);
            }

            memberDiv.appendChild(memberName);
            memberDiv.appendChild(orderedList);
            section.appendChild(memberDiv);
        }

    }

    document.querySelectorAll('.hidden1').forEach((elem) => (elem.style.display = 'block'))

}

function makeChoice(inputType, member, rank, choice) {
    input[inputType][member][rank] = choice;
}

document.querySelector('#choice-confirm').addEventListener('click', group);

function group() {
    let mentors = /*shuffleArray(*/Object.keys(input.mentors)/*)*/
    let mentees = /*shuffleArray(*/Object.keys(input.mentees)/*)*/
    let maxPair = mentees.length / (mentors.length - 1) + 1

    mentors.forEach((name) => (output.mentors[name] = new Array()));

    for(let mentor of mentors) {

        // if mentor has space, get choices
        if(output.mentors[mentor].length < maxPair) {
            let [firstChoice,secondChoice] = [input.mentors[mentor][0],input.mentors[mentor][1]];

            for(choice of [firstChoice,secondChoice]) {
                if(!output.mentees[choice]) {
                    output.mentors[mentor].push(choice);
                    output.mentees[choice] = mentor;
                }
            }
        }
    }

}

// remove 1st choice of mentor if mentee changes place


/* Stack Overflow Durstenfeld Shuffle */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}