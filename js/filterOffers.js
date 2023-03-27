export function filterOffers(data) {
  console.log(data);

  const filterForm = document.querySelector(".map__filters");

  filterForm.addEventListener("input", (evt) => {
    console.log(evt.target.value);

    const filteredData = data.filter((item) => {
      return (item.offer.type = evt.target.value);
    });

    console.log(filteredData);
  });
}
