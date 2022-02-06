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