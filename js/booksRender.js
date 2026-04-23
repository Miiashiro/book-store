import { selectBook } from "./cart.js";

const container = document.querySelector("#book-container");
const carouselList = document.querySelector("#splide-list");

// Carrossel dos livros da home-page
export function renderCarousel(allBooks) {
    if (!carouselList) return;

    const books = allBooks.slice(0, 10)

    if (books.length === 0) return;

    let cardText = '';

    books.forEach(book => {
        const info = book.volumeInfo;
        const price = book.saleInfo;
        const bookId = book.id;

        const title = info.title;
        const categories = info.categories
            ? info.categories.map(cat => `<span class="category">${cat}</span>`).join(" ")
            : `<span class="category">Sem categoria</span>`;
        const authors = info.authors ? info.authors.join(", ") : "Autor Desconhecido";
        const rating = info.averageRating ? info.averageRating : "Sem avaliação";
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=Sem+Capa';

        let priceTxt = "Indisponível";

        // Verificar se o livro está à venda e formatar o preço
        if (price?.saleability === "FOR_SALE") {
            const value = price.listPrice.amount;

            priceTxt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
        }

        cardText += `
            <li class="splide__slide">
                <article class="card-carousel">
                    <div class="book-image-carousel">
                        <img src="${thumbnail}" alt="Capa do livro ${title}">
                    </div>
                    <div class="txt-book">
                        <div class="category">
                            ${categories}
                        </div>
                        <span class="name-book">${title}</span>
                        <span class="authors">${authors}</span>
                        <span class="rating"><i class="fa-solid fa-star"></i> ${rating}</span>
                        <div class="buy" data-id="${bookId}">
                            <span class="price">${priceTxt}</span>
                            <button>
                                <i class="fa-solid fa-cart-shopping"></i>
                                <span>Comprar</span>
                            </button>
                        </div>
                    </div>
                </article>
            </li>
        `
    })

    carouselList.innerHTML = cardText;

    selectBook();

    new Splide('#my-carousel', {
        type: 'loop',
        perPage: 5,      // Quantos cards visíveis
        perMove: 5,      // PULA de 5 em 5 
        gap: '1rem',
        pagination: true,
        arrows: true,

        // Responsividade
        breakpoints: {
            1200: {
                perPage: 4,
                perMove: 4,
            },
            1024: {
                perPage: 3,
                perMove: 3,
            },
            768: {
                perPage: 2,
                perMove: 2,
            }
        },
    }).mount();
}

// Renderizar os livros na página de livros
export function renderBooksPage(filteredBook = allBooks) {
    if (!container) return;

    const booksToRender = filteredBook || [];

    if (booksToRender.length === 0) {
        container.innerHTML = "<p>Nenhum livro encontrado.</p>";
        return;
    }

    let cardText = '';

    booksToRender.forEach(book => {
        const info = book.volumeInfo;
        const price = book.saleInfo;
        const bookId = book.id;

        const title = info.title;
        const categories = info.categories
            ? info.categories.map(cat => `<span class="category">${cat}</span>`).join(" ")
            : `<span class="category">Sem categoria</span>`;
        const authors = info.authors ? info.authors.join(", ") : "Autor Desconhecido";
        const rating = info.averageRating ? info.averageRating : "Sem avaliação";
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=Sem+Capa';

        let priceTxt = "Indisponível";

        // Verificar se o livro está à venda e formatar o preço
        if (price?.saleability === "FOR_SALE") {
            const value = price.listPrice.amount;

            priceTxt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
        }
        
        cardText += `
                <article class="book-card">
                    <div class="book-image">
                        <img src="${thumbnail}" alt="Capa do livro ${title}">
                    </div>
                    <div class="txt-book">
                        <div class="category">
                            ${categories}
                        </div>
                        <span class="name-book">${title}</span>
                        <span class="authors">${authors}</span>
                        <span class="rating"><i class="fa-solid fa-star"></i> ${rating}</span>
                        <div class="buy" data-id="${bookId}">
                            <span class="price">${priceTxt}</span>
                            <button>
                                <i class="fa-solid fa-cart-shopping"></i>
                                <span>Comprar</span>
                            </button>
                        </div>
                    </div>
                </article>
            `;
    });

    container.innerHTML = cardText;

    // Selecionar livros ao carrinho
    selectBook();
}