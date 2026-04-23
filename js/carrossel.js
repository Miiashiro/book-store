let counter = 0;
let deletInterval;

export function initBannerCarousel() {
    // Selecionamos os elementos aqui dentro
    const slideImages = document.querySelectorAll('.slides img');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const dots = document.querySelectorAll('.dot');
    const slideContainer = document.querySelector('.slide');

    // Se não existir o container do slide
    if (!slideContainer || !next || !prev) return;

    // Botão de passar imagem
    next.addEventListener('click', slideNext);
    
    function slideNext() {
        slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
        if (counter >= slideImages.length - 1) {
            counter = 0;
        } else {
            counter++;
        }
        slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
        indicators();
    }
    
    // Botão de voltar imagem
    prev.addEventListener('click', slidePrev);
    
    function slidePrev() {
        slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
        if (counter <= 0) {
            counter = slideImages.length - 1;
        } else {
            counter--;
        }
        slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
        indicators();
    }
    
    // Auto sliding
    function autoSliding() {
        // Limpa intervalo anterior se existir para não duplicar velocidade
        clearInterval(deletInterval); 

        deletInterval = setInterval(() => {
            slideNext();
        }, 4500);
    }
    
    autoSliding();
    
    // Eventos de Mouse
    slideContainer.addEventListener('mouseover', () => clearInterval(deletInterval));
    slideContainer.addEventListener('mouseout', autoSliding);
    
    // Indicadores
    function indicators() {
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[counter]) dots[counter].classList.add('active');
    }

    // Suporte para clique nos dots (indicadores)
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const imageId = parseInt(this.getAttribute('attr'));
            if (imageId === counter) return;

            if (imageId > counter) {
                slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
                counter = imageId;
                slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
            } else {
                slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
                counter = imageId;
                slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
            }
            indicators();
        });
    });
}