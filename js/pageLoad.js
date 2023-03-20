import { mockData } from "./data.js";
import { createCards } from "./createCards.js";
import { adForm } from "./form.js";
import { renderMap } from "./renderMap.js";

export function preload() {
  document.querySelectorAll(":not(.map__canvas)").forEach((item) => {
    item.style.visibility = "hidden";
  });
}

export function init() {
  const form = document.querySelector(".ad-form");
  const mapCanvas = document.querySelector("#map-canvas");
  const cards = createCards(mockData).querySelectorAll(".popup");

  adForm(form);
  renderMap(mapCanvas, mockData, Array.from(cards));
}
