export function sendToServer(form) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = Object.fromEntries(new FormData(evt.target).entries());

    sendData(formData, form);
  });
}

function toValidObject(formData) {
  const avatarAsDataUrl = document.querySelector(
    ".ad-form-header__preview img"
  ).src;

  const photosAsDataURL = [];

  document.querySelectorAll("img.ad-form__photo").forEach((photo) => {
    photosAsDataURL.push(photo.src);
  });

  const features = [];

  document.querySelectorAll('[name="features"]:checked').forEach((feature) => {
    features.push(feature.value);
  });

  return {
    author: {
      avatar: avatarAsDataUrl,
    },
    offer: {
      title: formData.title,
      description: formData.description,
      address: {
        x: formData.address.split(", ")[0],
        y: formData.address.split(", ")[1],
      },
      price: formData.price,
      type: formData.type,
      rooms: formData.rooms,
      guests: formData.capacity,
      checkin: formData.timein,
      checkout: formData.timeout,
      features: features,
      photos: photosAsDataURL,
      location: {
        x: formData.address.split(" ,")[0],
        y: formData.address.split(" ,")[1],
      },
    },
  };
}

function sendData(formData, formNode) {
  fetch("http://127.0.0.1:3000/send-data", {
    method: "POST",
    body: JSON.stringify(toValidObject(formData)),
  })
    .then(() => {
      success();
    })
    .catch((err) => {
      error(err, formNode);
    });
}

function success() {
  const successNode = document.querySelector("#success");

  document.body.append(successNode.content.cloneNode(true));

  document.querySelector(".success__button").addEventListener("click", () => {
    location.reload();
  });
}

function error(formNode) {
  const successNode = document.querySelector("#error");

  document.body.append(successNode.content.cloneNode(true));

  document.querySelector(".error__button").addEventListener("click", () => {
    location.reload();
  });
}
