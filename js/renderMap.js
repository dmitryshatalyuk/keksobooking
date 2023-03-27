import { createCards } from "./createCards.js";
import { applyFilters } from "./filterOffers.js";

const latlongInput = document.querySelector("#address");

function mapInit(mapNode) {
  const map = L.map(mapNode).setView([35.675, 139.75], 12);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  return map;
}

export function renderMap(data) {
  const cards = createCards(data).querySelectorAll(".popup");
  const mapNode = document.querySelector("#map-canvas");

  const map = mapInit(mapNode);
  const pinGroup = L.layerGroup().addTo(map);
  const mainIcon = L.icon({
    iconUrl: "../leaflet/images/main-pin.png",
    iconSize: [32, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  const defaultIcon = L.icon({
    iconUrl: "../leaflet/images/pin.png",
    iconSize: [16, 16],
    iconAnchor: [16, 82],
    popupAnchor: [-3, -76],
  });
  const mainPin = L.marker([35.675, 139.75], {
    draggable: true,
    icon: mainIcon,
    autoPan: true,
  }).addTo(map);

  data.forEach((item, index) => {
    const marker = L.marker([item.offer.address.x, item.offer.address.y], {
      icon: defaultIcon,
    });
    marker.bindPopup(cards[index]);
    pinGroup.addLayer(marker);
  });

  filterOffers(data, pinGroup, defaultIcon, cards);

  mainPin.on("move", () => {
    latlongInput.value = `${mainPin.getLatLng().lat}, ${
      mainPin.getLatLng().lng
    }`;
  });
}

function clearLayers(pinGroup, filtered, defaultIcon, cards) {
  pinGroup.eachLayer(function (layer) {
    layer.remove();
  });

  filtered.forEach((item, index) => {
    const marker = L.marker([item.offer.address.x, item.offer.address.y], {
      icon: defaultIcon,
    });
    marker.bindPopup(cards[index]);
    pinGroup.addLayer(marker);
  });
}

function filterOffers(data, pinGroup, defaultIcon, cards) {
  const filterForm = document.querySelector(".map__filters");
  const appliedFilters = {
    features: [],
  };

  let filteredData = [];

  filterForm.addEventListener("change", (evt) => {
    appliedFilters[evt.target.name.split("-")[1]] = evt.target.value;

    if (evt.target.name === "features") {
      if (evt.target.checked) {
        appliedFilters.features.push(evt.target.value);
      } else {
        appliedFilters.features.splice(
          appliedFilters.features.indexOf(evt.target.value),
          1
        );
      }
    }

    filteredData = applyFilters(data, appliedFilters);
    cards = createCards(filteredData).querySelectorAll(".popup");
    clearLayers(pinGroup, filteredData, defaultIcon, cards);
  });
}
