//import { fetchBooks } from "./api.js";
import { initCart } from "./cart.js";
import { renderCarousel } from "./booksRender.js";
import { renderBooksPage } from "./booksRender.js";
import { createCategoryButtons } from "./filters.js";
import { setupFilters } from "./filters.js";

let allBooks = [];

const mockData = {
    items: [
        {
            id: "_ojXNuzgHRcC",
            volumeInfo: { title: "Senhor dos Anéis", authors: ["J.R.R. Tolkien"], averageRating: 4.9, categories: ["Fantasia", "Aventura", "Mistério"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/2c3e50/ffffff?text=Senhor+dos+Aneis" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 1.90, currencyCode: "BRL" } }
        },
        {
            id: "1zL7vwEACAAJ",
            volumeInfo: { title: "Código Limpo", authors: ["Robert C. Martin"], averageRating: 4.7, categories: ["Computação"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/2980b9/ffffff?text=Codigo+Limpo" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 10.90, currencyCode: "BRL" } }
        },
        {
            id: "yWz3DwAAQBAJ",
            volumeInfo: { title: "Sapiens: Uma Breve História", authors: ["Yuval Noah Harari"], averageRating: 4.6, categories: ["História"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/e67e22/ffffff?text=Sapiens" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 56.90, currencyCode: "BRL" } }
        },
        {
            id: "R_N_AAAAMAAJ",
            volumeInfo: { title: "Dom Casmurro", authors: ["Machado de Assis"], averageRating: 4.8, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Dom+Casmurro" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            id: "kotPYEqx7kMC",
            volumeInfo: { title: "1984", authors: ["George Orwell"], averageRating: 4.7, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/c0392b/ffffff?text=1984" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 20.90, currencyCode: "BRL" } }
        },
        {
            id: "Pqz1GAAACAAJ",
            volumeInfo: { title: "O Sol é para Todos", authors: ["Harper Lee"], averageRating: 4.9, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/f39c12/ffffff?text=Sol+Para+Todos" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 89.90, currencyCode: "BRL" } }
        },
        {
            id: "6oHuKQe3TjQC",
            volumeInfo: { title: "Design Patterns", authors: ["Erich Gamma"], averageRating: 4.5, categories: ["Computação"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/34495e/ffffff?text=Design+Patterns" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 450.90, currencyCode: "BRL" } }
        },
        {
            id: "wrOQLV6xB-wC",
            volumeInfo: { title: "Harry Potter e a Pedra Filosofal", authors: ["J.K. Rowling"], averageRating: 4.8, categories: ["Fantasia"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Harry+Potter" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 15.90, currencyCode: "BRL" } }
        },
        {
            id: "A1_OAwAAQBAJ",
            volumeInfo: { title: "O Espadachim de Carvão", authors: ["Affonso Solano"], averageRating: 4.6, categories: ["Fantasia"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/2c3e50/ffffff?text=Espadachim" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 4050.90, currencyCode: "BRL" } }
        },
        {
            id: "A2_OAwAAQBAJ",
            volumeInfo: { title: "O Espadachim de lagos", authors: ["Affonso Solano"], averageRating: 4.6, categories: ["Fantasia", "Romance"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/2c3e50/ffffff?text=Espadachim" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        }
    ]
};

document.addEventListener("DOMContentLoaded", async () => {
    allBooks = mockData.items;
    //const bookApi = await fetchBooks();

    // if (bookApi || bookApi.length > 0) {
    //     allBooks = bookApi;

    //     renderCarousel();
    //     renderBooksPage(allBooks);
    //     createCategoryButtons();
    // } else {
    //     console.log("espere");
    // }

    renderCarousel(allBooks);
    renderBooksPage(allBooks);
    createCategoryButtons(allBooks);

    setupFilters(allBooks);
    initCart(allBooks);
})