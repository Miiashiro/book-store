var container = document.querySelector('.container');
var dialog = document.querySelector('.carrinho-ico');
var modal = document.querySelector('.modal');
var itemCart = document.querySelector('.itens');
var showBook = document.querySelector('#show');

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    };
});

//itens
const books = [
    {
        id: 1,
        bookName: "Paulo aposto e os desafios da evangelização",
        price: "100,00",
        img: "../imgs/books/paulo_apostolo.PNG"
    },
    {
        id: 2,
        bookName: "O Espadachim de Carvão",
        price: "100,00",
        img: "../imgs/books/espadachim_de_carvao.PNG"
    },
    {
        id: 3,
        bookName: "Harry Potter e a Pedra Filosofal",
        price: "100,00",
        img: "../imgs/books/harry_potter.PNG"
    },
    {
        id: 4,
        bookName: "Dom Casmurro",
        price: "100,00",
        img: "../imgs/books/dom_casmurro.PNG"
    },
    {
        id: 5,
        bookName: "Senhor dos Aneis a Sociedade do Anel",
        price: "100,00",
        img: "../imgs/books/senhor_dos_aneis.PNG"
    },
    {
        id: 6,
        bookName: "Os segredos da mente milionária",
        price: "100,00",
        img: "../imgs/books/mente_milionaria.PNG"
    }
];

const cartShopping = []

//funcao de mostrar os livros
const gridBooks = (books) => {
    books.map((books) => {
        //cartão do livro
        const div = document.createElement("div");
        div.classList.add("card");
        container.appendChild(div);

        //imagem do livro
        const imagem = document.createElement("img");
        imagem.src = books.img;
        imagem.classList.add("books-image")
        div.appendChild(imagem);

        //nome do livro
        const title = document.createElement("p");
        title.classList.add("nome");
        title.innerHTML = books.bookName;
        div.appendChild(title);

        //preco do livro
        const value = document.createElement("p");
        value.classList.add("price");
        value.innerHTML = `R$${books.price}`;
        div.appendChild(value);

        //botao de adicionar
        const buttonAdd = document.createElement("button");
        buttonAdd.classList.add("add");
        buttonAdd.innerHTML = "Adicionar";
        div.appendChild(buttonAdd);

        //adiciona no array o livro que o usuario clicou
        buttonAdd.addEventListener("click", (e) => {
            console.log(books.id); //-------------------------

            buttonAdd.disabled = true;  // Desabilita o botão após o clique

            cartShopping.push({
                id: books.id,
                bookName: books.bookName,
                price: books.price,
                img: books.img,
                quantity: 1
            });

            showItemCart()
        })
    });
};

//Abrir o modal do carrinho de vendas
dialog.addEventListener("click", (e) => {
    modal.showModal();

    if (cartShopping.length > 0) {
        showBook.classList.add("hide"); //esconde a frase de nao haver livros adicionados
    }
});

function showItemCart() {
    cartShopping.map((booksCart) => {
        //div
        const divCart = document.createElement("div");
        divCart.classList.add("item");
        itemCart.appendChild(divCart);

        //imagem do livro
        const imgItemCart = document.createElement("img");
        imgItemCart.classList.add("img_item_cart")
        imgItemCart.src = booksCart.img;
        divCart.appendChild(imgItemCart);

        //div envolta do nome do livro
        const wrapNameCart = document.createElement("div");
        wrapNameCart.classList.add("wrap_name_cart");
        divCart.appendChild(wrapNameCart);

        //nome do livro
        const nameBookCart = document.createElement("span");
        nameBookCart.classList.add("name_book_cart");
        nameBookCart.innerHTML = booksCart.bookName;
        wrapNameCart.appendChild(nameBookCart);

        //preco
        const priceCart = document.createElement("span");
        priceCart.classList.add("price_cart");
        priceCart.innerHTML = `R$ ${booksCart.price}`;
        divCart.appendChild(priceCart);

        //div envolta da quantidade
        const wrapQuantCart = document.createElement("div");
        wrapQuantCart.classList.add("wrap_quant_cart")
        divCart.appendChild(wrapQuantCart);

        //botao de retirar
        const buttonMinus = document.createElement("button");
        buttonMinus.classList.add("button_minus");
        buttonMinus.innerHTML = "-";
        wrapQuantCart.appendChild(buttonMinus);

        buttonMinus.addEventListener("click", (e) => {
            booksCart.quantity --;
            console.log(cartShopping)
        })

        //input marcando a quantidade comprada
        const quantityCart = document.createElement("input");
        quantityCart.classList.add("quantity_cart");
        quantityCart.value = booksCart.quantity;
        wrapQuantCart.appendChild(quantityCart);

        //botao de adicionar
        const buttonPlus = document.createElement("button");
        buttonPlus.classList.add("button_plus");
        buttonPlus.innerHTML = "+";
        wrapQuantCart.appendChild(buttonPlus);

        buttonPlus.addEventListener("click", (e) => {
            booksCart.quantity ++;
            console.log(cartShopping)
        })
    });
}

gridBooks(books)