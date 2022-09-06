document.onload = scrollMap();

function scrollMap() {
    var section = document.querySelector('section')
    section.scrollTo(section.scrollWidth, section.scrollHeight)
}

var svgmap = document.querySelector('svg')
svgmap.addEventListener('click', toggleColour)
svgmap.addEventListener('touchend', toggleColour)
svgmap.addEventListener('mousemove', showTooltip)

function toggleColour(e) {
    if(e.target.tagName !== "circle") return;
    let colour = e.target.getAttribute('fill');
    let newColour = colour;
    switch(colour) {
        case "crimson": newColour = "gold"; break;
        case "gold": newColour = "green"; break;
        default: newColour = "crimson"; break;
    }
    e.target.setAttribute('fill', newColour);
}

let tooltip = document.getElementById('tooltip');
function showTooltip(e) {
    if(e.target.tagName !== "circle"){
        tooltip.style.opacity = 0;
        return;
    }
    tooltip.innerText = e.target.dataset.tooltip;
    tooltip.style.opacity = 1;
    tooltip.style.top = (e.clientY - 10) + "px";
    tooltip.style.left = (e.clientX + 20) + "px";
}