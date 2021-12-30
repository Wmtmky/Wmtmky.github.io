window.onload = function () {

    getTheme();
    //localStorage.clear();

    adjustHeightConstant();

};

window.onresize = function () {

    adjustHeightConstant();

};

/*
let oldScroll = 0;
window.addEventListener("scroll", function() {
    let scroll = window.scrollY;
    let height = window.innerHeight;

    if (scroll < 0) {
        window.scrollY = 0;
        console.log("0");
    } else if (oldScroll < scroll && scroll < height) {
        window.location.replace("#projects");
        console.log("projects");
    }

    oldScroll = scroll;
});
*/

function getTheme() {

    let lightMode = localStorage.getItem('--lightMode');
    let darkMode = localStorage.getItem('--darkMode');

    if (lightMode != null && lightMode.includes("hsl")) setTheme('--lightMode', lightMode);
    if (darkMode != null && darkMode.includes("hsl")) setTheme('--darkMode', darkMode);

}

function lightswitch() {

    let lightMode = getComputedStyle(document.documentElement).getPropertyValue('--lightMode');
    let darkMode = getComputedStyle(document.documentElement).getPropertyValue('--darkMode');

    if (lightMode.includes("hsl")) lightMode = invertHSL(lightMode.replaceAll(/[^0-9,]/g, "").split(","));
    if (darkMode.includes("hsl")) darkMode = invertHSL(darkMode.replaceAll(/[^0-9,]/g, "").split(","));

    setTheme('--lightMode', lightMode);
    setTheme('--darkMode', darkMode);

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

function dynamicBackground(event) {
    let grad = getComputedStyle(document.documentElement).getPropertyValue('--bgMain');
    if (grad == null) return;

    // rotate
    let speed = Math.random() / 2 // deg per mousemove
    let deg = grad.split(/deg/)[0].split(" ");
    deg = (parseFloat(deg[deg.length - 1]) + speed) % 360;

    let xPos = event.clientX / window.innerWidth * 100;
    let yPos = event.clientY / window.innerHeight * 100;
    
    grad = "radial-gradient(farthest-corner at " + xPos + "% " + yPos + "%, #DDDF, #EEED 10%, #EEE9 30%, #FFF4 60%, #FFF1 80%), conic-gradient(from " + deg + "deg at " + xPos + "% " + yPos + "%, #F28, #71C, #52B, #46F, #49F, #5DF, #5BF, #99F, #D6D, #F28)";

    setTheme('--bgMain', grad);

}

function adjustHeightConstant() {

    document.getElementsByClassName("height-constant")[0].style.height = "calc(100vh - " + document.getElementById("projects").clientHeight + "px)";

}
