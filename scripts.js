const cardsEl = document.getElementById("cards");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filter-button");
let poems = [];
let activeType = "todos";

async function loadPoems() {
  try {
    const response = await fetch("poems.json");
    if (!response.ok) throw new Error("No se pudo cargar la base de datos.");
    poems = await response.json();
    renderCards(poems);
  } catch (error) {
    cardsEl.innerHTML = `<p class="empty">Error al cargar los poemas. Asegúrate de ejecutar este sitio desde un servidor local o que el archivo exista.</p>`;
    console.error(error);
  }
}

function renderCards(list) {
  if (!list.length) {
    cardsEl.innerHTML = `<p class="empty">No se encontró ningún poema con esos criterios.</p>`;
    return;
  }

  cardsEl.innerHTML = list
    .map(
      (item) => `
      <article class="card">
        <div class="meta">
          <span>${item.tipo}</span>
          <span class="tag">${item.categoria}</span>
        </div>
        <h2>${item.titulo}</h2>
        <p>${item.texto.replace(/\n/g, "<br />")}</p>
        <footer>Autor: ${item.autor} · Publicado: ${item.fecha}</footer>
      </article>`
    )
    .join("");
}

function applyFilter() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = poems.filter((item) => {
    const matchesType = activeType === "todos" || item.tipo === activeType;
    const matchesSearch = [item.titulo, item.autor, item.texto, item.categoria]
      .join(" ")
      .toLowerCase()
      .includes(query);
    return matchesType && matchesSearch;
  });
  renderCards(filtered);
}

searchInput.addEventListener("input", applyFilter);
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeType = button.dataset.type;
    applyFilter();
  });
});

loadPoems();
