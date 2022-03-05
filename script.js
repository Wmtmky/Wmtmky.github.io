window.onload = function () {
    
    setViewport();
    adjustHeightConstant();
    getTheme();
    //localStorage.clear();

};

window.onresize = function () {

    adjustHeightConstant();

};

// maintain viewport height for soft keyboard on android
function setViewport () {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", viewport.content + ", height = " + window.innerHeight);
}

function getTheme() {

    let lightMode = localStorage.getItem('--home-lightMode');
    let darkMode = localStorage.getItem('--home-darkMode');

    if (lightMode != null && lightMode.includes("hsl")) setTheme('--home-lightMode', lightMode);
    if (darkMode != null && darkMode.includes("hsl")) setTheme('--home-darkMode', darkMode);

}

function lightswitch() {

    let lightMode = getComputedStyle(document.documentElement).getPropertyValue('--home-lightMode');
    let darkMode = getComputedStyle(document.documentElement).getPropertyValue('--home-darkMode');

    if (lightMode.includes("hsl")) lightMode = invertHSL(lightMode.replaceAll(/[^0-9,]/g, "").split(","));
    if (darkMode.includes("hsl")) darkMode = invertHSL(darkMode.replaceAll(/[^0-9,]/g, "").split(","));

    setTheme('--home-lightMode', lightMode);
    setTheme('--home-darkMode', darkMode);

}

function invertHSL(HSL) {

    HSL[0] = (parseInt(HSL[0]) + 180) % 360;
    HSL[2] = 100 - HSL[2];

    return "hsl(" + HSL[0] + "deg, " + HSL[1] + "%, " + HSL[2] + "%)";

}

function setTheme(value, property) {

    //console.log(value + ", " + property);
    document.documentElement.style.setProperty(value, property);
    localStorage.setItem(value, property);

}

let focusX;
let focusY;
let dynBgInterval = setInterval(function(){});
document.onmousemove = function(e) {
    clearInterval(dynBgInterval);
    dynamicBackground(e);
    dynBgInterval = setInterval(function(){
        dynamicBackground(e);
    }, 8);
};
function dynamicBackground(event) {
    let grad = getComputedStyle(document.documentElement).getPropertyValue('--home-bgMain');
    if (grad == null) return;
    if ((focusX > event.clientX - 10 && focusX < event.clientX + 10) || (focusY > event.clientY - 10 && focusY < event.clientY + 10)) return;

    // rotate
    let change = 0.5 // deg per mousemove
    let deg = grad.split(/deg/)[0].split(" ");
    deg = (parseFloat(deg[deg.length - 1]) + (change * 0.25)) % 360;

    if (focusX == null || focusY == null) {
        focusX = window.innerWidth * 0.5;
        focusY = window.innerHeight * 0.5;
    }

    let xPos = (focusX + (event.clientX - focusX) * 0.01 * change);
    let yPos = (focusY + (event.clientY - focusY) * 0.01 * change);

    focusX = xPos;
    focusY = yPos;
    xPos = xPos / window.innerWidth * 100;
    yPos = yPos / window.innerHeight * 100;

    grad = "radial-gradient(farthest-corner at " + xPos + "% " + yPos + "%, #DDDF, #EEED 10%, #EEE9 30%, #FFF4 60%, #FFF1 80%), conic-gradient(from " + deg + "deg at " + xPos + "% " + yPos + "%, #F28, #71C, #52B, #46F, #49F, #5DF, #5BF, #99F, #D6D, #F28)";

    setTheme('--home-bgMain', grad);

}

function adjustHeightConstant() {

    document.getElementsByClassName("height-constant")[0].style.height = "calc(100vh - " + document.getElementById("projects").clientHeight + "px)";

}
