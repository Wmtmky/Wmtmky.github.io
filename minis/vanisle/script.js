document.onload = scrollMap();

function scrollMap() {
    document.querySelector('section').scrollTo(4000, 4000)
}

document.querySelector('svg').addEventListener('click', toggleColour)
document.querySelector('svg').addEventListener('touchend', toggleColour)
document.querySelector('svg').addEventListener('mousemove', showTooltip)

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
        tooltip.style.display = 'none';
        return;
    }
    tooltip.innerText = e.target.dataset.tooltip;
    tooltip.style.display = 'block';
    tooltip.style.top = (e.clientY - 10) + "px";
    tooltip.style.left = (e.clientX + 20) + "px";
}