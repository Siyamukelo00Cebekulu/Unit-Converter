const tabs = document.querySelectorAll(".tab");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputLabel = document.getElementById("input-label");

const units = {
  length: [
    "Millimeter",
    "Centimeter",
    "Meter",
    "Kilometer",
    "Inch",
    "Foot",
    "Yard",
    "Mile",
  ],
  weight: ["Milligram", "Gram", "Kilogram", "Ounce", "Pound"],
  temperature: ["Celsius", "Fahrenheit", "Kelvin"],
};

function loadUnits(type) {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  units[type].forEach((unit) => {
    const option1 = document.createElement("option");
    option1.textContent = unit;

    const option2 = document.createElement("option");
    option2.textContent = unit;

    fromUnit.appendChild(option1);
    toUnit.appendChild(option2);
  });

  inputLabel.textContent = `Enter the ${type} to convert`;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const type = tab.dataset.type;
    loadUnits(type);
  });
});

// default load
loadUnits("length");
