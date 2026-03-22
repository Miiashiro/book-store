const container = document.querySelector("#book-container");
const carouselList = document.querySelector("#splide-list");

const mockData = {
    items: [
        {
            volumeInfo: { title: "Senhor dos Anéis", authors: ["J.R.R. Tolkien"], averageRating: 4.9, categories: ["Fantasia", "Aventura", "Mistério"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/2c3e50/ffffff?text=Senhor+dos+Aneis" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Código Limpo", authors: ["Robert C. Martin"], averageRating: 4.7, categories: ["Computação"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/2980b9/ffffff?text=Codigo+Limpo" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Sapiens: Uma Breve História", authors: ["Yuval Noah Harari"], averageRating: 4.6, categories: ["História"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/e67e22/ffffff?text=Sapiens" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 59.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Dom Casmurro", authors: ["Machado de Assis"], averageRating: 4.8, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Dom+Casmurro" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Dom Casmurro", authors: ["Machado de Assis"], averageRating: 4.8, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Dom+Casmurro" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Dom Casmurro", authors: ["Machado de Assis"], averageRating: 4.8, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Dom+Casmurro" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Dom Casmurro", authors: ["Machado de Assis"], averageRating: 4.8, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Dom+Casmurro" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Dom Casmurro", authors: ["Machado de Assis"], averageRating: 4.8, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Dom+Casmurro" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "Harry Potter e a Pedra Filosofal", authors: ["Machado de Assis"], averageRating: 4.8, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Dom+Casmurro" } },
            saleInfo: { saleability: "FOR_SALE", listPrice: { amount: 45.90, currencyCode: "BRL" } }
        },
        {
            volumeInfo: { title: "O espadachim de Carvão", authors: ["Machado de Assis"], averageRating: 4.8, categories: ["Ficção"], imageLinks: { thumbnail: "https://via.placeholder.com/128x192/8e44ad/ffffff?text=Dom+Casmurro" } },
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

async function renderBooksPage() {
    /*const books = await fetchBooks();

    if (books.length === 0) {
        container.innerHTML = "<p>Nenhum livro encontrado.</p>";
        return;
    }*/

    const data = mockData;
    const books = data.items;

    console.log(books);

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

document.addEventListener("DOMContentLoaded", async () => {
    /*const bookCarousel = await fetchBooks()*/
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
                <article class="card-carrossel">
                    <div class="book-image-carrossel">
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

    new Splide('#meu-carrossel', {
        type   : 'loop',
        perPage: 5,      // Quantos cards visíveis
        perMove: 5,      // PULA de 5 em 5 (isso gera apenas 2 bolinhas se tiver 10 itens)
        gap    : '1rem', // Espaço entre os cards
        pagination: true, // Ativa as bolinhas
        arrows    : true, // Ativa as setas
        
        // Responsividade simples
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
})

//fetchBooks();
renderBooksPage();