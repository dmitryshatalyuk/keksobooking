const latlongInput = document.querySelector("#address");

export function renderMap(mapNode, data, cards) {
  const map = mapInit(mapNode);
  const mainIcon = L.icon({
    iconUrl: "../leaflet/images/main-pin.png",
    iconSize: [32, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  data.forEach((item, index) => {
    const marker = L.marker([item.offer.address.x, item.offer.address.y]).addTo(
      map
    );
    marker.bindPopup(cards[index]);
  });

  const mainPin = L.marker([35.675, 139.75], {
    draggable: true,
    icon: mainIcon,
    autoPan: true,
  }).addTo(map);

  mainPin.on("move", () => {
    latlongInput.value = `${mainPin.getLatLng().lat}, ${
      mainPin.getLatLng().lng
    }`;
  });
}

function mapInit(mapNode) {
  const map = L.map(mapNode).setView([35.675, 139.75], 12);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  return map;
}
