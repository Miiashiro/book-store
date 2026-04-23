import { fetchBooks } from "./api.js";
import { initBannerCarousel } from "./carrossel.js";
import { initCart } from "./cart.js";
import { renderCarousel } from "./booksRender.js";
import { renderBooksPage } from "./booksRender.js";
import { createCategoryButtons } from "./filters.js";
import { setupFilters } from "./filters.js";

let allBooks = [];

document.addEventListener("DOMContentLoaded", async () => {
    const bookApi = await fetchBooks();

    initBannerCarousel();

    if (bookApi || bookApi.length > 0) {
        allBooks = bookApi;

        renderCarousel(allBooks);
        renderBooksPage(allBooks);
        createCategoryButtons(allBooks);
        setupFilters(allBooks);
        initCart(allBooks);
    } else {
        const container = document.querySelector("#book-container");
        if(container) container.innerHTML = "<p>Erro ao carregar livros. Tente novamente.</p>";
    };
});