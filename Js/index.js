const container = document.querySelector("#book-container");
const carouselList = document.querySelector("#splide-list");
const inputMinPrice = document.querySelector("#min-price");
const inputMaxPrice = document.querySelector("#max-price");
const icoCart = document.querySelector("#ico-cart");
const categoryContainer = document.querySelector(".type-category");
const modal = document.querySelector(".modal");
const badge = document.querySelector("#badge");

let allBooks = [];
let booksCart = [];
let currentCategory = "Todos";

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
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            id: "A2_OAwAAQBAJ",
            volumeInfo: { title: "O Espadachim de lagos", authors: ["Affonso Solano"], averageRating: 4.6, categories: ["Fantasia", "Romance"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/2c3e50/ffffff?text=Espadachim" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        }
    ]
};
/*
async function fetchBooks() {
    // Cria uma lista de palavras amplas em inglês para trazer resultados misturados
    const palavrasChave = ['world', 'history', 'science', 'ocean', 'space', 'future', 'art', 'magic', 'life'];
    
    // Sortear uma palavra dessa lista
    const palavraSorteada = palavrasChave[Math.floor(Math.random() * palavrasChave.length)];
    
    // Sortear um número de 0 a 40 para pular os primeiros resultados, trazendo uma variedade maior de livros
    const puloAleatorio = Math.floor(Math.random() * 40);
    
    try{
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${palavraSorteada}&maxResults=20&startIndex=${puloAleatorio}&filter=paid-ebooks`);

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data.items || [];
    } catch (error) {
        console.error("Erro ao buscar os livros:", error);
    }
}*/

// Carrossel dos livros da home-page
async function renderCarousel() {
    /*const bookCarousel = await fetchBooks()*/

    if (!carouselList) return;

    const data = mockData.items;
    console.log(data)
    const books = data.slice(0, 10);

    let cardText = '';

    books.forEach(book => {
        const info = book.volumeInfo;
        const price = book.saleInfo;

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
                        <img src="./images/teste.png" alt="Capa do livro ${title}">
                    </div>
                    <div class="txt-book">
                        <div class="category">
                            ${categories}
                        </div>
                        <span class="name-book">${title}</span>
                        <span class="authors">${authors}</span>
                        <span class="rating"><i class="fa-solid fa-star"></i> ${rating}</span>
                        <div class="buy">
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

    new Splide('#my-carousel', {
        type: 'loop',
        perPage: 5,      // Quantos cards visíveis
        perMove: 5,      // PULA de 5 em 5 
        gap: '1rem',
        pagination: true,
        arrows: true,

        // Responsividade
        breakpoints: {
            1024: {
                perPage: 3,
                perMove: 3,
            },
            768: {
                perPage: 1,
                perMove: 1,
            }
        }
    }).mount();
}

// Renderizar os livros na página de livros
function renderBooksPage(filteredBook = allBooks) {
    if (!container) return;

    if (filteredBook.length === 0) {
        container.innerHTML = "<p>Nenhum livro encontrado.</p>";
        return;
    }

    let cardText = '';

    filteredBook.forEach(book => {
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
        //<img src=${thumbnail} alt="Capa do livro ${title}">
        cardText += `
                <article class="book-card">
                    <div class="book-image">
                        <img src="./images/teste.png" alt="Capa do livro ${title}">
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

// Adicionar livros ao carrinho
function selectBook() {
    const btnBuy = document.querySelectorAll(".buy");

    btnBuy.forEach(btn => {
        btn.addEventListener("click", () => {
            const bookId = btn.getAttribute("data-id");

            let bookSelected = allBooks.find(book => book.id === bookId);

            booksCart.push(bookSelected);

            if (booksCart.length >= 1) {
                badge.className = badge.className.replace('hide', 'show');
            }
        });
    });
};


// Modal
icoCart.addEventListener("click", () => {
    modal.showModal();
    renderBooksCart();
});

function renderBooksCart() {
    const item = document.querySelector("#items-buy");
    const spanTotal = document.querySelector(".total");

    let cardText = '';
    let total = 0;

    if (booksCart.length == 0) {
        item.innerHTML = `<span class="txt-none-item">Sem itens no carrinho</span`;
        spanTotal.innerHTML = `<span>Total: R$0,00</span`;
        return;
    }

    const groupedCart = booksCart.reduce((acumulator, book) => {
        if (acumulator[book.id]) {
            acumulator[book.id].quantity += 1;
        } else {
            acumulator[book.id] = { dadosDoLivro: book, quantity: 1 };
        }

        return acumulator;
    }, {});

    const listFinalCart = Object.values(groupedCart);

    listFinalCart.forEach(itemCart => {
        const info = itemCart.dadosDoLivro.volumeInfo;
        const price = itemCart.dadosDoLivro.saleInfo;
        const bookId = itemCart.dadosDoLivro.id;

        const qtd = itemCart.quantity;

        const title = info.title;
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=Sem+Capa';

        const value = price.listPrice.amount;

        total += (value * qtd);

        priceTxt = `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}`;

        cardText += `
                <article class="items-cart">
                    <img src="./images/teste.png" alt="Capa do livro ${title}">
                    <div>${title}</div>
                    <div>${priceTxt}</div>
                
                    <div class="quant-button-wrap">
                        <button class="minus" data-id="${bookId}">-</button>
                        <input value="${qtd}" readonly>
                        <button class="plus" data-id="${bookId}">+</button>
                    </div>
                    <div class="delete-item" data-id="${bookId}">X</div>
                </article>
            `
    })

    item.innerHTML = cardText;

    spanTotal.innerHTML = `<span>Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>`

    activeButtonsQuantity();
};

// Ativar os botões de aumentar e diminuir quantidade e deletar item
function activeButtonsQuantity() {
    const addQtdItem = document.querySelectorAll(".plus");
    const minusQtdItem = document.querySelectorAll(".minus");
    const deleteItem = document.querySelectorAll(".delete-item");

    addQtdItem.forEach(btn => {
        btn.addEventListener("click", () => {
            const bookId = btn.getAttribute("data-id");

            const addBook = allBooks.find(book => book.id === bookId);

            if (addBook) {
                booksCart.push(addBook);

                renderBooksCart();
            };
        });
    });

    minusQtdItem.forEach(btn => {
        btn.addEventListener("click", () => {
            const bookId = btn.getAttribute("data-id");

            const index = booksCart.findIndex(book => book.id === bookId);

            if (index !== -1) {
                booksCart.splice(index, 1);

                renderBooksCart();
            };
        });
    });

    deleteItem.forEach(btn => {
        btn.addEventListener("click", () => {
            const bookId = btn.getAttribute("data-id");

            booksCart = booksCart.filter(book => book.id !== bookId);

            if (booksCart.length == 0) {
                badge.className = badge.className.replace("show", "hide");
            };

            renderBooksCart();
        });
    });
};

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
});

// Criação da seção dos botões para filtrar os livros
function createCategoryButtons() {
    if (!categoryContainer) return;

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

function applyAllFilters() {
    let filteredBooks = allBooks;

    // Filtro Categoria
    if (currentCategory !== "Todos") {
        filteredBooks = filteredBooks.filter(book => book.volumeInfo.categories?.includes(currentCategory));
    };

    // Filtro por pesquiso de nome
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
}

//fetchBooks();
document.addEventListener("DOMContentLoaded", () => {

    //const books = await fetchBooks();
    allBooks = mockData.items;

    renderCarousel();
    renderBooksPage(allBooks)
    createCategoryButtons()

    // Ouvinte do filtro de preço
    if (inputMinPrice && inputMaxPrice) {
        inputMinPrice.addEventListener("input", applyAllFilters);
        inputMaxPrice.addEventListener("input", applyAllFilters);
    }

    // Ouvinte da barra de busca
    const inputSearch = document.querySelector(".container-search input[name='search']");

    const formSearchBook = document.querySelector("#form-busca-livros");

    if (inputSearch && formSearchBook) {
        inputSearch.addEventListener("input", applyAllFilters);

        formSearchBook.addEventListener("subimit", (e) => {
            e.preventDefault();
            applyAllFilters();
        });
    };

    // Se o usuário estiver na Home Page, o 'formSearchLivros' será null.

    // Verifica se veio redirecionado da Home Page (URL Params)
    const parametrosUrl = new URLSearchParams(window.location.search);
    const termoDaUrl = parametrosUrl.get("search");

    if (termoDaUrl && inputSearch) {
        inputSearch.value = termoDaUrl;
        applyAllFilters();
    };
})