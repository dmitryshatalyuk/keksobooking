import { createCards } from "./createCards.js";
import { adForm } from "./form.js";
import { renderMap } from "./renderMap.js";
import { sendToServer } from "./sendToServer.js";
import { filterOffers } from "./filterOffers.js";

const form = document.querySelector(".ad-form");
const mapCanvas = document.querySelector("#map-canvas");

export function preload() {
  document.querySelectorAll(":not(.map__canvas)").forEach((item) => {
    item.style.visibility = "hidden";
  });
}

export async function init() {
  await fetch("http://127.0.0.1:3000/receive-data", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const offersData = data;
      const cards = createCards(offersData).querySelectorAll(".popup");

      adForm(form);
      renderMap(mapCanvas, offersData, Array.from(cards));
      filterOffers(offersData);
    })
    .catch((err) => {
      console.log(err);
    });

  sendToServer(form);
}
