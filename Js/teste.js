// Removi o .value daqui de cima para pegarmos apenas os elementos HTML
const container = document.querySelector("#book-container");
const carouselList = document.querySelector("#splide-list");
const categoryContainer = document.querySelector(".type-category");
const inputMinPrice = document.querySelector("#min-price");
const inputMaxPrice = document.querySelector("#max-price");
const btnFiltrarPreco = document.querySelector("#btn-filtrar"); // Botão que você deve ter no HTML

let allBooks = [];

const mockData = {
    items: [
        {
            volumeInfo: { title: "Senhor dos Anéis", authors: ["J.R.R. Tolkien"], averageRating: 4.9, categories: ["Fantasia", "Aventura", "Mistério"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/2c3e50/ffffff?text=Senhor+dos+Aneis" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 1.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Código Limpo", authors: ["Robert C. Martin"], averageRating: 4.7, categories: ["Computação"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/2980b9/ffffff?text=Codigo+Limpo" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 10.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Sapiens: Uma Breve História", authors: ["Yuval Noah Harari"], averageRating: 4.6, categories: ["História"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/e67e22/ffffff?text=Sapiens" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 56.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Dom Casmurro", authors: ["Machado de Assis"], averageRating: 4.8, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Dom+Casmurro" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "1984", authors: ["George Orwell"], averageRating: 4.7, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/c0392b/ffffff?text=1984" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 20.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "O Sol é para Todos", authors: ["Harper Lee"], averageRating: 4.9, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/f39c12/ffffff?text=Sol+Para+Todos" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 89.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Design Patterns", authors: ["Erich Gamma"], averageRating: 4.5, categories: ["Computação"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/34495e/ffffff?text=Design+Patterns" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 450.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Harry Potter e a Pedra Filosofal", authors: ["J.K. Rowling"], averageRating: 4.8, categories: ["Fantasia"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Harry+Potter" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 15.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "O Espadachim de Carvão", authors: ["Affonso Solano"], averageRating: 4.6, categories: ["Fantasia"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/2c3e50/ffffff?text=Espadachim" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        }
    ]
};

// Carrossel dos livros da home-page
document.addEventListener("DOMContentLoaded", () => {
    // Verificação de segurança: se não tiver a div do splide, pula essa parte (evita erros em páginas que não têm o carrossel)
    if (!carouselList) return; 

    const data = mockData.items;
    const books = data.slice(0, 10);

    let cardText = '';

    books.forEach(book => {
        const info = book.volumeInfo;
        const price = book.saleInfo;

        const title = info.title;
        const categories = info.categories ? info.categories.map(cat => `<span class="category">${cat}</span>`).join(" ") : `<span class="category">Sem categoria</span>`;
        const authors = info.authors ? info.authors.join(", ") : "Autor Desconhecido";
        const rating = info.averageRating ? info.averageRating : "Sem avaliação";
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=Sem+Capa';

        let priceTxt = "Indisponível";

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
        `;
    });

    carouselList.innerHTML = cardText;

    new Splide('#my-carousel', {
        type   : 'loop',
        perPage: 5,      
        perMove: 5,      
        gap    : '1rem', 
        pagination: true, 
        arrows    : true, 
        breakpoints: {
            1024: { perPage: 3, perMove: 3 },
            768: { perPage: 1, perMove: 1 }
        }
    }).mount();
});

// Renderizar os livros na página principal
function renderBooksPage(filteredBook = allBooks) {
    if (!container) return; // Evita erro se o container não existir na página

    let cardText = '';

    // Se a filtragem não encontrar nada, exibe mensagem
    if (filteredBook.length === 0) {
        container.innerHTML = "<p>Nenhum livro encontrado com esses critérios.</p>";
        return;
    }

    filteredBook.forEach(book => {
        const info = book.volumeInfo;
        const price = book.saleInfo;

        const title = info.title;
        const categories = info.categories ? info.categories.map(cat => `<span class="category">${cat}</span>`).join(" ") : `<span class="category">Sem categoria</span>`;
        const authors = info.authors ? info.authors.join(", ") : "Autor Desconhecido";
        const rating = info.averageRating ? info.averageRating : "Sem avaliação";
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=Sem+Capa';

        let priceTxt = "Indisponível";

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
                    <div class="buy">
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
}

// Filtragem por Categoria
function filterBooks(category){
    if(category === "Todos"){
        renderBooksPage(allBooks);
        return;
    }

    const filtered = allBooks.filter(book => book.volumeInfo.categories?.includes(category));
    renderBooksPage(filtered);
}

// Criação da seção dos botões de Categoria
function createCategoryButtons(){
    if(!categoryContainer) return; // Segurança

    const allCategories = allBooks.flatMap(book => book.volumeInfo.categories || []);
    const uniqueCategories = ["Todos", ...new Set(allCategories)];

    uniqueCategories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;

        btn.addEventListener("click", () => {
            document.querySelectorAll(".type-category button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterBooks(category);
        });

        categoryContainer.appendChild(btn);
    });
}

// ==========================================
// NOVO: FILTRAGEM POR PREÇO
// ==========================================
function filterByPrice() {
    // Pegamos os valores EXATAMENTE na hora do clique!
    // Usamos parseFloat para transformar o texto em número.
    const min = parseFloat(inputMinPrice.value) || 0; // Se o usuário não digitar nada, vira 0
    const max = parseFloat(inputMaxPrice.value) || Infinity; // Se não digitar nada, vira Infinito

    const filtered = allBooks.filter(book => {
        // Se o livro não está à venda, não passará no filtro de preço
        if (book.saleInfo?.saleability !== "FOR_SALE") return false;

        const price = book.saleInfo.listPrice.amount;
        
        // Verifica se o preço está entre o mínimo e o máximo
        return price >= min && price <= max;
    });

    // Manda desenhar a nova lista filtrada na tela!
    renderBooksPage(filtered);
}

// Inicia tudo
document.addEventListener("DOMContentLoaded", () => {
    // Carrega os livros na variável global
    allBooks = mockData.items;

    // Renderiza a lista principal
    renderBooksPage(allBooks);

    // Cria os botões de categorias
    createCategoryButtons();

    // Ativa o botão do filtro de preço
    if (btnFiltrarPreco) {
        btnFiltrarPreco.addEventListener("click", filterByPrice);
    }
});