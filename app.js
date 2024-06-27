const fetchAllButton = document.getElementById("fetch-all");
const fetchFilteredButton = document.getElementById("fetch-filtered");
const toggleFiltersButton = document.getElementById("toggle-filters");
const filtersDiv = document.getElementById("filters");
const resultsDiv = document.getElementById("results");

fetchAllButton.addEventListener("click", todosLosPersonajes);
fetchFilteredButton.addEventListener("click", personajesFiltrados);
toggleFiltersButton.addEventListener("click", () => {
  const buttonText = filtersDiv.classList.toggle("hidden")
    ? "Mostrar filtros"
    : "Ocultar filtros";
  toggleFiltersButton.textContent = buttonText;
});

function todosLosPersonajes() {
  fetch("https://rickandmortyapi.com/api/character?page=1")
    .then((response) => response.json())
    .then((data) => mostrarResultados(data.results))
    .catch((error) => mostrarError(error.message));
}

function personajesFiltrados() {
  const name = document.getElementById("name")?.value || "";
  const status = document.getElementById("status")?.value || "";
  const species = document.getElementById("species")?.value || "";
  const type = document.getElementById("type")?.value || "";
  const gender = document.getElementById("gender")?.value || "";

  const url = new URL("https://rickandmortyapi.com/api/character");
  if (name) url.searchParams.append("name", name);
  if (status) url.searchParams.append("status", status);
  if (species) url.searchParams.append("species", species);
  if (type) url.searchParams.append("type", type);
  if (gender) url.searchParams.append("gender", gender);

  fetch(url)
    .then((response) => response.json())
    .then((data) => mostrarResultados(data.results))
    .catch((error) => mostrarError(error.message));
}

function mostrarResultados(results) {
  resultsDiv.innerHTML = "";
  if (!results || results.length === 0) {
    resultsDiv.innerHTML = `<p class="notFound">No se han encontrado personajes</p>`;
    return;
  }

  results.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${character.image}">
      <h3>${character.name}</h3>
      <p>Estado: ${character.status}</p>
      <p>Especie: ${character.species}</p>
      <p>Tipo: ${character.type || "N/A"}</p>
      <p>Género: ${character.gender}</p>
    `;

    resultsDiv.appendChild(card);
  });
}

function mostrarError(error) {
  resultsDiv.innerHTML = `<p class="error">Error: ${error}</p>`;
}
