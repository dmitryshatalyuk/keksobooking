const propertyPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const pricePerNightInput = document.querySelector("#price");
const checkinInput = document.querySelector("#timein");
const checkoutInput = document.querySelector("#timeout");

export function adForm(form) {
  form.addEventListener("input", (evt) => {
    if (evt.target.name === "type") {
      changeInputMinPrice(evt.target.value, pricePerNightInput);
    }

    if (evt.target.name === "timein") {
      setCheckout(evt.target.value, checkoutInput);
    } else if (evt.target.name === "timeout") {
      setCheckin(evt.target.value, checkinInput);
    }
  });
}

function changeInputMinPrice(propertyType, priceInput) {
  priceInput.placeholder = propertyPrices[propertyType];
  priceInput.min = propertyPrices[propertyType];
}

function setCheckout(checkinTime, checkoutInput) {
  checkoutInput.value = checkinTime;
}

function setCheckin(checkoutTime, checkinInput) {
  checkinInput.value = checkoutTime;
}