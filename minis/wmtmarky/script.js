//Settings

let mode = "grade-calculator";
function eventModeSwitch() {
    switch (mode) {
        case "grade-calculator":
            switchMode("wpa", 160, "WPA Calculator"); break;
        case "wpa":
            switchMode("bc-ach-avg", 10, "BC Achievement Average Calculator"); break;
        case "bc-ach-avg": //fallthrough
        default:
            switchMode("grade-calculator", 240, "Final Grade Calculator");
    }
}

function switchMode(newMode, hue, modeTitle){
    document.getElementById(mode).classList.add("hidden");
    mode = newMode;
    document.getElementById(mode).classList.remove("hidden");
    document.documentElement.style.setProperty("--hue", hue);
    document.getElementById("mode-title").innerHTML = modeTitle;
}

function redirectAnchor() {
    let anchor = window.location.href.split('#')[1];
    if (anchor == undefined) return;
    switch (anchor) {
    case "wpa":
        switchMode("wpa", 160, "WPA Calculator"); break;
    case "bc-ach-avg":
        switchMode("bc-ach-avg", 10, "BC Achievement Average Calculator"); break;
    case "grade-calculator": //fallthrough
    default:
        switchMode("grade-calculator", 240, "Final Grade Calculator");
    }
}

window.onload = redirectAnchor();

/* Grade Calculator */

let target = "finals-mark";

function chooseTarget(choice) {
    choice = choice.getAttribute("for");
    target = choice;
    document.getElementsByClassName("target")[0].removeAttribute("disabled");
    document.getElementsByClassName("target")[0].classList.remove("target");
    document.getElementById(choice).setAttribute("disabled","true");
    document.getElementById(choice).classList.add("target");
    calcFinal();
}

function calcFinal() {
    let pg = document.getElementById('previous-grade');
    let ng = document.getElementById('new-grade');
    let fw = document.getElementById('finals-weight');
    let fm = document.getElementById('finals-mark');

    if (target == fm.id) {
        if (!isNumeric(pg.value) || !isNumeric(ng.value) || !isNumeric(fw.value)) return;
        fm.value = ( (ng.value - pg.value + (pg.value * fw.value / 100)) / (fw.value / 100) ).toFixed(3);

    } else if (target == ng.id) {
        if (!isNumeric(pg.value) || !isNumeric(fw.value) || !isNumeric(fm.value)) return;
        ng.value = ( pg.value - (pg.value * fw.value / 100) + (fm.value * fw.value / 100) ).toFixed(3);

    } else if (target == pg.id) {
        if (!isNumeric(ng.value) || !isNumeric(fw.value) || !isNumeric(fm.value)) return;
        pg.value = ( (ng.value - (fm.value * fw.value / 100)) / (1 - (fw.value / 100)) ).toFixed(3);

    } else if (target == fw.id) {
        if (!isNumeric(pg.value) || !isNumeric(ng.value) || !isNumeric(fm.value)) return;
        fw.value = ( 100 * (ng.value - pg.value) / (fm.value - pg.value) ).toFixed(3);
        
    }

}

function isNumeric (value) {
    return /(?!^0+$)^-?\d+.?\d*$/.test(value);
}

/* WPA Calculator */

function calcWPAresult(activeInput) {

    let resultingWPA = 0;
    let WPAgradeArray = document.getElementsByClassName("wpa-grade")

    for(let WPAgradeElem of WPAgradeArray) {
        resultingWPA += WPAgradeElem.value - 100;
    }

    document.getElementById("wpa-result").value = (resultingWPA / WPAgradeArray.length).toFixed(3);

}

function WPAadd() {
    let gridItem = document.createElement("div")
    gridItem.setAttribute("class","grid-item");

    let courseInput = document.createElement("input");
    courseInput.setAttribute("class","wpa-course")
    courseInput.setAttribute("type","text");
    courseInput.setAttribute("placeholder","Course Name (optional)");

    let gradeInput = document.createElement("input");
    gradeInput.setAttribute("class","wpa-grade");
    gradeInput.setAttribute("type","number");
    gradeInput.setAttribute("onkeyup","calcWPAresult()");

    gridItem.appendChild(courseInput);
    gridItem.innerHTML += "&nbsp; ";
    gridItem.appendChild(gradeInput);
    gridItem.innerHTML += " <label>&percnt;</label>";
    document.getElementById("wpa").appendChild(gridItem);
}

function WPAremove() {
    let WPAgradeArray = document.getElementById("wpa");
    if (WPAgradeArray.childElementCount > 2) WPAgradeArray.removeChild(WPAgradeArray.lastChild);
}

/* BC ACH AVG */

function bcachavg(activeInput) {

    let bcachAverage = 0;
    let bcachavgArray = document.getElementsByClassName("bc-ach-avg-grade")

    for(let bcachavgElem of bcachavgArray) {
        bcachAverage += (+bcachavgElem.value);
    }

    document.getElementById("bc-ach-avg-result").value = (bcachAverage / bcachavgArray.length).toFixed(2);

}
