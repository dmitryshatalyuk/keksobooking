const propertyPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const roomsCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const capacityOfRooms = {
  0: [100],
  1: [1],
  2: [1, 2],
  3: [2, 3],
};

const pricePerNightInput = document.querySelector("#price");
const checkinInput = document.querySelector("#timein");
const checkoutInput = document.querySelector("#timeout");
const capacityInput = document.querySelector("#capacity");
const roomsInput = document.querySelector("#room_number");
const userAvatarPreview = document.querySelector(
  ".ad-form-header__preview img"
);
const photosContainer = document.querySelector(".ad-form__photo-container");

export function adForm(form) {
  form.addEventListener("input", (evt) => {
    // console.log(evt.target.name, evt.target.value);
    switch (evt.target.name) {
      case "type":
        changeInputMinPrice(evt.target.value, pricePerNightInput);
        break;

      case "timein":
        setCheckout(evt.target.value, checkoutInput);
        break;

      case "timeout":
        setCheckin(evt.target.value, checkinInput);
        break;

      case "rooms":
        validateRoomQuantity(evt.target.value, capacityInput);
        break;

      case "capacity":
        validateCapacity(evt.target.value, roomsInput);
        break;

      case "avatar":
        updateAvatarPreview(evt.target, userAvatarPreview);
        break;

      case "images":
        updatePhotosPreview(evt.target, photosContainer);
        break;
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

function validateRoomQuantity(rooms, capacityNode) {
  if (rooms == 100) {
    capacityNode.value = 0;
  } else {
    capacityNode.value = rooms;
  }

  capacityNode.querySelectorAll(`option`).forEach((option) => {
    option.disabled = true;
  });

  roomsCapacity[rooms].forEach((item) => {
    capacityNode.querySelector(
      `option[value="${item != 100 ? item : 0}"]`
    ).disabled = false;
  });
}

function validateCapacity(capacity, roomsNode) {
  console.log(capacity);

  if (capacity == 0) {
    roomsNode.value = 100;
  } else {
    roomsNode.value = capacity;
  }

  roomsNode.querySelectorAll(`option`).forEach((option) => {
    option.disabled = true;
  });

  capacityOfRooms[capacity].forEach((item) => {
    roomsNode.querySelector(
      `option[value="${item != 0 ? item : 100}"]`
    ).disabled = false;
  });
}

function updateAvatarPreview(image, preview) {
  const fileReader = new FileReader();

  fileReader.addEventListener("load", (evt) => {
    preview.src = evt.target.result;
    image.value = evt.target.result;
  });

  fileReader.readAsDataURL(image.files[0]);
}

function updatePhotosPreview(photos, container) {
  const fragment = new DocumentFragment();
  const photosArray = Array.from(photos.files);

  photosArray.forEach((photo, index) => {
    const fileReader = new FileReader();
    const imageNode = document.createElement("img");
    imageNode.classList.add("ad-form__photo");

    fileReader.addEventListener("load", (evt) => {
      imageNode.src = evt.target.result;
    });

    fileReader.readAsDataURL(photo);
    fragment.append(imageNode);
  });

  container.append(fragment);
}
