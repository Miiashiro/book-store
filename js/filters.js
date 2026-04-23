import { renderBooksPage } from './booksRender.js';

const categoryContainer = document.querySelector(".type-category");
const inputMinPrice = document.querySelector("#min-price");
const inputMaxPrice = document.querySelector("#max-price");
const inputSearch = document.querySelector(".container-search input[name='search']");
const formSearchLivros = document.querySelector("#form-busca-livros");

let currentCategory = "Todos";
let databaseBooks = [];

// Criação da seção dos botões para filtrar os livros
export function createCategoryButtons(allBooks) {
    if (!categoryContainer) return;

    databaseBooks = allBooks;

    const allCategories = allBooks.flatMap(book =>
        book.volumeInfo.categories || []
    );

    const uniqueCategories = ["Todos", ...new Set(allCategories)];

    uniqueCategories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;

        btn.addEventListener("click", () => {
            document.querySelectorAll(".type-category button")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            currentCategory = category;

            applyAllFilters();
        });

        categoryContainer.appendChild(btn);
    });
};

// Configuração dos filtros de preço e pesquisa
export function setupFilters(allBooks) {
    databaseBooks = allBooks;

    // Filtros de preço
    if (inputMinPrice && inputMaxPrice) {
        inputMinPrice.addEventListener("input", applyAllFilters);
        inputMaxPrice.addEventListener("input", applyAllFilters);
    }

    // Filtro de pesquisa
    if (inputSearch && formSearchLivros) {
        inputSearch.addEventListener("input", applyAllFilters);
        
        formSearchLivros.addEventListener("submit", (e) => {
            e.preventDefault();
            applyAllFilters();
        });
    }

    // Leitura da URL ao carregar a página
    const parametrosUrl = new URLSearchParams(window.location.search);
    const termoDaUrl = parametrosUrl.get("search");

    if (termoDaUrl && inputSearch) {
        inputSearch.value = termoDaUrl; 
        applyAllFilters(); 
    }
}

// Aplicação de todos os filtros
function applyAllFilters() {
    let filteredBooks = databaseBooks;

    // Filtro Categoria
    if (currentCategory !== "Todos") {
        filteredBooks = filteredBooks.filter(book => book.volumeInfo.categories?.includes(currentCategory));
    };

    // Filtro por pesquisa de nome
    const inputSearch = document.querySelector(".container-search input[name='search']");
    if (inputSearch && inputSearch.value.trim() !== "") {
        const lowerSearch = inputSearch.value.trim().toLowerCase();

        filteredBooks = filteredBooks.filter(book => {
            const name = book.volumeInfo.title.toLowerCase();
            return name.includes(lowerSearch)
        });
    };

    // Filtro de preço
    if (inputMinPrice && inputMaxPrice) {
        const min = parseFloat(inputMinPrice.value) || 0;
        const max = parseFloat(inputMaxPrice.value) || Infinity;

        filteredBooks = filteredBooks.filter(book => {
            const price = book.saleInfo.listPrice.amount;
            return price >= min && price <= max;
        });
    };

    renderBooksPage(filteredBooks)
};