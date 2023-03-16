const card = document.querySelector("#card");

const propertyType = {
  flat: "Квартира",
  bungalow: "Бунгало",
  house: "Будинок",
  palace: "Палац",
};

export function createCards(data) {
  const fragment = new DocumentFragment();

  data.forEach((item) => {
    createCard(item, fragment);
  });

  return fragment;

  // document.body.append(fragment);
}

function createCard(item, fragment) {
  const cardNode = card.content.cloneNode(true);

  cardNode.querySelector(".popup__avatar").src = item.author.avatar;
  cardNode.querySelector(".popup__title").innerText = item.offer.title;
  cardNode.querySelector(
    ".popup__text--address"
  ).innerText = `${item.offer.address.x}, ${item.offer.address.y}`;
  cardNode.querySelector(
    ".popup__text--price"
  ).innerText = `${item.offer.price} грн/ніч`;
  cardNode.querySelector(".popup__type").innerText =
    propertyType[item.offer.type];
  cardNode.querySelector(
    ".popup__text--capacity"
  ).innerText = `${item.offer.rooms} кімнати для ${item.offer.guests} гостей`;
  cardNode.querySelector(
    ".popup__text--time"
  ).innerText = `Заїзд після ${item.offer.checkin}, виїзд до ${item.offer.checkout}`;
  cardNode.querySelector(".popup__features").innerText =
    item.offer.features.join(", ");
  cardNode.querySelector(".popup__description").innerText =
    item.offer.description;

  item.offer.photos.forEach((photo) => {
    const photoNode = cardNode.querySelector(".popup__photo").cloneNode();
    photoNode.src = photo;

    cardNode.querySelector(".popup__photos").append(photoNode);
  });
  cardNode.querySelectorAll(".popup__photo")[0].remove();
  fragment.append(cardNode);

  return cardNode;
}
