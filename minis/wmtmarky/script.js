
function calcFinal() {
    let cg = document.getElementById('current-grade');
    let tg = document.getElementById('target-grade');
    let fw = document.getElementById('finals-weight');
    let mk = document.getElementById('mark-needed');

    if (!isNumeric(cg.value) || !isNumeric(tg.value) || !isNumeric(fw.value)) return;

    mk.innerHTML = ( (tg.value - cg.value + (cg.value * fw.value / 100)) / (fw.value / 100) ).toFixed(2) + "%";

}

function isNumeric (value) {
    return /^-?\d+.?\d*$/.test(value);
}