const hexElements = document.querySelectorAll("[data-hex-value]");
const radioElements = document.querySelectorAll("input[name=format]");

const convertColorValues = (value) => {
  hexElements.forEach(element => {
    let format = `data-${value}-value`;
    let colorValue = element.getAttribute(format);

    if (value === "rgb") {
      element.innerHTML = `rgb(<span>${colorValue}</span>)`;
    } else {
      element.innerHTML = `#<span>${colorValue}</span>`;
    }
  });
};

const init = () => {
  radioElements.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      let value = event.target.value;
      convertColorValues(value);
    });
  });
};

export default init;
