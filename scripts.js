const cardsEl = document.getElementById("cards");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const resultCountEl = document.getElementById("resultCount");
const filterButtons = document.querySelectorAll(".filter-button");
let poems = [];
let activeType = "todos";
let activeCategory = "todos";

const sortByDateDesc = (list) => [...list].sort((a, b) => b.fecha.localeCompare(a.fecha));

const updateResultCount = (count, total) => {
  resultCountEl.textContent = `Mostrando ${count} de ${total} entradas`;
};

const populateCategoryOptions = () => {
  const categories = new Set();
  poems.forEach((item) => getCategories(item).forEach((category) => categories.add(category)));
  const sorted = [...categories].sort((a, b) => a.localeCompare(b, "es"));
  categorySelect.innerHTML = '<option value="todos">Todas</option>' +
    sorted.map((category) => `<option value="${category}">${category}</option>`).join("");
};

const getCategories = (item) => {
  if (Array.isArray(item.categorias)) return item.categorias;
  if (item.categoria) return [item.categoria];
  return [];
};

const renderCategoryTags = (item) => {
  const categories = getCategories(item);
  if (!categories.length) return "<span class=\"tag\">Sin categoría</span>";
  return categories.map((category) => `<span class="tag">${category}</span>`).join(" ");
};

async function loadPoems() {
  try {
    const response = await fetch("poems.json");
    if (!response.ok) throw new Error("No se pudo cargar la base de datos.");
    poems = sortByDateDesc(await response.json());
    populateCategoryOptions();
    renderCards(poems);
  } catch (error) {
    cardsEl.innerHTML = `<p class="empty">Error al cargar los poemas. Asegúrate de ejecutar este sitio desde un servidor local o que el archivo exista.</p>`;
    console.error(error);
  }
}

function renderCards(list) {
  if (!list.length) {
    cardsEl.innerHTML = `<p class="empty">No se encontró ningún poema con esos criterios.</p>`;
    updateResultCount(0, poems.length);
    return;
  }

  cardsEl.innerHTML = list
    .map(
      (item) => `
      <article class="card">
        <div class="meta">
          <span>${item.tipo}</span>
          ${renderCategoryTags(item)}
        </div>
        <h2>${item.titulo}</h2>
        <p>${item.texto.replace(/\n/g, "<br />")}</p>
        <footer>Autor: ${item.autor} · Publicado: ${item.fecha}</footer>
      </article>`
    )
    .join("");
  updateResultCount(list.length, poems.length);
}

function applyFilter() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = poems.filter((item) => {
    const matchesType = activeType === "todos" || item.tipo === activeType;
    const categories = getCategories(item);
    const matchesCategory = activeCategory === "todos" || categories.includes(activeCategory);
    const categoryText = categories.join(" ");
    const matchesSearch = [item.titulo, item.autor, item.texto, categoryText]
      .join(" ")
      .toLowerCase()
      .includes(query);
    return matchesType && matchesCategory && matchesSearch;
  });
  renderCards(sortByDateDesc(filtered));
}

searchInput.addEventListener("input", applyFilter);
categorySelect.addEventListener("change", (event) => {
  activeCategory = event.target.value;
  applyFilter();
});
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeType = button.dataset.type;
    applyFilter();
  });
});

loadPoems();
