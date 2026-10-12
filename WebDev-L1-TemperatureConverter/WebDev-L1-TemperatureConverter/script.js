```javascript
const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const resultValue = document.getElementById("resultValue");
const resultMessage = document.getElementById("resultMessage");

function convertTemperature(value, from, to) {
    let celsius;

    // Convert the input to Celsius first
    if (from === "C") {
        celsius = value;
    } else if (from === "F") {
        celsius = (value - 32) * 5 / 9;
    } else {
        celsius = value - 273.15;
    }

    // Convert Celsius to the target unit
    if (to === "C") {
        return celsius;
    } else if (to === "F") {
        return (celsius * 9 / 5) + 32;
    } else {
        return celsius + 273.15;
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const value = Number(temperatureInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (temperatureInput.value.trim() === "") {
        resultValue.textContent = "--";
        resultMessage.textContent = "Please enter a temperature.";
        return;
    }

    if (!Number.isFinite(value)) {
        resultValue.textContent = "--";
        resultMessage.textContent = "Please enter a valid number.";
        return;
    }

    if (from === "K" && value < 0) {
        resultValue.textContent = "--";
        resultMessage.textContent = "Kelvin cannot be below zero.";
        return;
    }

    const celsiusValue = from === "C"
        ? value
        : from === "F"
            ? (value - 32) * 5 / 9
            : value - 273.15;

    if (celsiusValue < -273.15) {
        resultValue.textContent = "--";
        resultMessage.textContent =
            "Temperature cannot be below absolute zero.";
        return;
    }

    const converted = convertTemperature(value, from, to);
    const symbols = { C: "°C", F: "°F", K: "K" };

    resultValue.textContent =
        `${Number(converted.toFixed(2))} ${symbols[to]}`;

    resultMessage.textContent =
        `${value} ${symbols[from]} converted to ${symbols[to]}.`;
});
```
