const modal = document.querySelector(".modal");
const icoCart = document.querySelector("#ico-cart");
const badge = document.querySelector("#badge");

let booksCart = [];
let databaseBooks = [];

export function initCart(allBooks) {
    databaseBooks = allBooks;

    // Modal
    if (icoCart) {
        icoCart.addEventListener("click", () => {
            modal.showModal();
            renderBooksCart();
        });
    }

    // Fechar modal
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.close();
    });
}

// Adicionar livros ao carrinho
export function selectBook() {
    const btnBuy = document.querySelectorAll(".buy");

    btnBuy.forEach(btn => {
        btn.addEventListener("click", () => {
            const bookId = btn.getAttribute("data-id");

            let bookSelected = databaseBooks.find(book => book.id === bookId);

            booksCart.push(bookSelected);

            if (booksCart.length >= 1) {
                badge.className = badge.className.replace('hide', 'show');
            }
        });
    });
};

// Renderizar os livros no carrinho
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

        let priceTxt = `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}`;

        cardText += `
                <article class="items-cart">
                    <div class="book-image-cart"> 
                        <img src="./images/teste.png" alt="Capa do livro ${title}">
                    </div>
                    <div class="txt-cart">
                        <div class="title">${title}</div>
                        <div>${priceTxt}</div>
                        
                        <div class="quant-button-wrap">
                            <button class="minus" data-id="${bookId}">-</button>
                            <input value="${qtd}" readonly>
                            <button class="plus" data-id="${bookId}">+</button>
                        </div>

                        <div class="delete-item" data-id="${bookId}">X</div>

                    </div>
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

    // Aumentar quantidade
    addQtdItem.forEach(btn => {
        btn.addEventListener("click", () => {
            const bookId = btn.getAttribute("data-id");

            const addBook = databaseBooks.find(book => book.id === bookId);

            if (addBook) {
                booksCart.push(addBook);

                renderBooksCart();
            };
        });
    });

    // Diminuir quantidade
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

    // Deletar item
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