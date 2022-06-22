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

//gets theme from local storage
function getTheme() {

    let mainTheme = localStorage.getItem('--home-mainTheme');
    let contrastTheme = localStorage.getItem('--home-contrastTheme');

    if (mainTheme != null && mainTheme.includes("hsl")) locallyStore('--home-mainTheme', mainTheme);
    if (contrastTheme != null && contrastTheme.includes("hsl")) locallyStore('--home-contrastTheme', contrastTheme);

}

function lightswitch() {

    let mainTheme = getComputedStyle(document.documentElement).getPropertyValue('--home-mainTheme');
    let contrastTheme = getComputedStyle(document.documentElement).getPropertyValue('--home-contrastTheme');

    if (mainTheme.includes("hsl")) mainTheme = invertHSL(mainTheme.replaceAll(/[^0-9,]/g, "").split(","));
    if (contrastTheme.includes("hsl")) contrastTheme = invertHSL(contrastTheme.replaceAll(/[^0-9,]/g, "").split(","));

    locallyStore('--home-mainTheme', mainTheme);
    locallyStore('--home-contrastTheme', contrastTheme);

}

function invertHSL(HSL) {

    HSL[0] = (parseInt(HSL[0]) + 180) % 360;
    HSL[2] = 100 - HSL[2];

    return "hsl(" + HSL[0] + "deg, " + HSL[1] + "%, " + HSL[2] + "%)";

}

function locallyStore(value, property) {

    //console.log(value + ", " + property);
    document.documentElement.style.setProperty(value, property);
    localStorage.setItem(value, property);

}


//dynamic background
let focusX;
let focusY;
let dynBgInterval = setInterval(function(){});
document.onmousemove = function(e) {
    clearInterval(dynBgInterval);
    dynamicBackground(e);
    dynBgInterval = setInterval(function(){
        dynamicBackground(e);
    }, 8); //125 fps
};
function dynamicBackground(event) {
    let grad = getComputedStyle(document.documentElement).getPropertyValue('--home-bgMain'); //gradient
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

    locallyStore('--home-bgMain', grad);

}

function adjustHeightConstant() {

    document.getElementsByClassName("height-constant")[0].style.height = "calc(100vh - " + document.getElementById("projects").clientHeight + "px)";

}
