let selectedOption = 0;

function selectOption(id) {
  const opt1 = document.getElementById("opt1");
  const opt2 = document.getElementById("opt2");

  if (selectedOption === id) {
    // If clicking same option again, deselect it
    selectedOption = 0;
    if (id === 1) {
      opt1.style.backgroundColor = "white";
      opt1.querySelector(".circle").style.backgroundColor = "white";
    } else {
      opt2.style.backgroundColor = "white";
      opt2.querySelector(".circle").style.backgroundColor = "white";
    }
  } else {
    // Select the new option and deselect the other
    selectedOption = id;

    if (id === 1) {
      opt1.style.backgroundColor = "#e0f0ff";
      opt1.querySelector(".circle").style.backgroundColor = "#007bff";

      opt2.style.backgroundColor = "white";
      opt2.querySelector(".circle").style.backgroundColor = "white";
    } else {
      opt2.style.backgroundColor = "#e0f0ff";
      opt2.querySelector(".circle").style.backgroundColor = "#007bff";

      opt1.style.backgroundColor = "white";
      opt1.querySelector(".circle").style.backgroundColor = "white";
    }
  }
}

function submitSelection() {
  const tempInput = document.getElementById("tempInput").value;
  const result = document.getElementById("result");

  if (tempInput === "") {
    result.textContent = "Please enter a temperature value.";
    return;
  }

  const temp = Number(tempInput);
  if (isNaN(temp)) {
    result.textContent = "Invalid temperature entered.";
    return;
  }

  if (selectedOption === 1) {
    let fahrenheit = (temp * 9 / 5) + 32;
    result.textContent = temp + "°C = " + fahrenheit.toFixed(2) + "°F";
  } else if (selectedOption === 2) {
    let celsius = (temp - 32) * 5 / 9;
    result.textContent = temp + "°F = " + celsius.toFixed(2) + "°C";
  } else {
    result.textContent = "Please select a conversion option.";
  }
}
