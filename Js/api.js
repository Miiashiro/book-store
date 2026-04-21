export async function fetchBooks() {
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
}