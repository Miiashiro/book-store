import { fetchBooks } from "./api.js";
import { initBannerCarousel } from "./carrossel.js";
import { initCart } from "./cart.js";
import { renderCarousel, renderBooksPage, showLoading } from "./booksRender.js";
import { createCategoryButtons, setupFilters } from "./filters.js";

let allBooks = [];

document.addEventListener("DOMContentLoaded", async () => {
    showLoading();

    const bookApi = await fetchBooks();

    initBannerCarousel();

    if (bookApi || bookApi.length > 0) {
        allBooks = bookApi;

        const temCarrossel = document.querySelector("#splide-list");
        const temGradeLivros = document.querySelector("#book-container");

        // Se estiver na Home (onde tem o carrossel do Splide)
        if (temCarrossel) {
            renderCarousel(allBooks);     
        }
        
        // Se estiver na Página de Mais Livros (onde tem a grade principal)
        if (temGradeLivros) {
            renderBooksPage(allBooks);
            createCategoryButtons(allBooks);
        }
        
        setupFilters(allBooks);
        initCart(allBooks);
    } else {
        const container = document.querySelector("#book-container");
        if(container) container.innerHTML = "<p>Erro ao carregar livros. Tente novamente.</p>";
    };
});