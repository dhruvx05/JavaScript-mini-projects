let count = 0;
let countEl = document.getElementById("count-el"); // Corrected variable name

function count_up() {
    count += 1; 
    countEl.textContent = count;
}

function count_down() {
    count -= 1; 
    countEl.textContent = count;
}

function reset() {
    count = 0;
    countEl.textContent = count; 
}

console.log("Let's do the counting!");
