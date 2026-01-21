const tabs = document.querySelectorAll(".tab");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputLabel = document.getElementById("input-label");
const form = document.getElementById("converterForm");

const formView = document.getElementById("formView");
const resultView = document.getElementById("resultView");
const resultText = document.getElementById("resultText");
const resetBtn = document.getElementById("resetBtn");

let currentType = "length";

const units = {
  length: {
    Millimeter: 0.001,
    Centimeter: 0.01,
    Meter: 1,
    Kilometer: 1000,
    Inch: 0.0254,
    Foot: 0.3048,
    Yard: 0.9144,
    Mile: 1609.34,
  },
  weight: {
    Milligram: 0.001,
    Gram: 1,
    Kilogram: 1000,
    Ounce: 28.3495,
    Pound: 453.592,
  },
};

function loadUnits(type) {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  if (type === "temperature") {
    ["Celsius", "Fahrenheit", "Kelvin"].forEach((u) => {
      fromUnit.add(new Option(u, u));
      toUnit.add(new Option(u, u));
    });
  } else {
    for (let unit in units[type]) {
      fromUnit.add(new Option(unit, unit));
      toUnit.add(new Option(unit, unit));
    }
  }

  inputLabel.textContent = `Enter the ${type} to convert`;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    currentType = tab.dataset.type;
    loadUnits(currentType);
  });
});

// default load
loadUnits("length");


resetBtn.addEventListener("click", () => {
  form.reset();
  resultView.classList.add("hidden");
  formView.classList.remove("hidden");
});

function convertTemperature(value, from, to) {
  let celsius;

  if (from === "Celsius") celsius = value;
  if (from === "Fahrenheit") celsius = ((value - 32) * 5) / 9;
  if (from === "Kelvin") celsius = value - 273.15;

  if (to === "Celsius") return celsius;
  if (to === "Fahrenheit") return (celsius * 9) / 5 + 32;
  if (to === "Kelvin") return celsius + 273.15;
}

const unitSymbols = {
  Millimeter: "mm",
  Centimeter: "cm",
  Meter: "m",
  Kilometer: "km",
  Inch: "in",
  Foot: "ft",
  Yard: "yd",
  Mile: "mi",

  Milligram: "mg",
  Gram: "g",
  Kilogram: "kg",
  Ounce: "oz",
  Pound: "lb",

  Celsius: "°C",
  Fahrenheit: "°F",
  Kelvin: "K",
};

const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  errorMsg.textContent = "";

  const value = valueInput.value.trim();
  const from = fromUnit.value;
  const to = toUnit.value;

  if (value === "") {
    errorMsg.textContent = "Please enter a value to convert.";
    return;
  }

  if (isNaN(value)) {
    errorMsg.textContent = "Please enter a valid number.";
    return;
  }

  if (from === to) {
    errorMsg.textContent = "Please select two different units.";
    return;
  }

  const numericValue = parseFloat(value);
  let result;

  if (currentType === "temperature") {
    result = convertTemperature(numericValue, from, to);
  } else {
    const base = numericValue * units[currentType][from];
    result = base / units[currentType][to];
  }

  const fromSymbol = unitSymbols[from];
  const toSymbol = unitSymbols[to];

  resultText.textContent = `${numericValue} ${fromSymbol} = ${result.toFixed(2)} ${toSymbol}`;

  formView.classList.add("hidden");
  resultView.classList.remove("hidden");
});