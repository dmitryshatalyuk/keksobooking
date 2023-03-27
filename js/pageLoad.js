import { createCards } from "./createCards.js";
import { adForm } from "./form.js";
import { renderMap } from "./renderMap.js";
import { sendToServer } from "./sendToServer.js";
// import { filterOffers } from "./filterOffers.js";

const form = document.querySelector(".ad-form");
export const mapCanvas = document.querySelector("#map-canvas");
const filterForm = document.querySelector(".map__filters");

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
      adForm(form);
      renderMap(offersData);
    })
    .catch((err) => {
      console.log(err);
    });

  sendToServer(form);
}
