var slideImages = document.querySelectorAll('.slides img');
var next = document.querySelector('.next');
var prev = document.querySelector('.prev');

// Acesso aos indicadores
var dots = document.querySelectorAll('.dot');

var counter = 0;

// Botao de proxima imagem
next.addEventListener('click', slideNext);

function slideNext(){
    slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';

    if(counter >= slideImages.length - 1){
        counter = 0;
    } else {
        counter++;
    }

    slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
    indicators()
}

// Botao de voltar imagem
prev.addEventListener('click', slidePrev);

function slidePrev(){
    slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';

    if(counter >= slideImages.length - 1){
        counter = 0;
    } else {
        counter++
    }

    slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
    indicators()
}

// Auto sliding
function autoSliding(){
    deletInterval = setInterval(timer, 4000);

    function timer(){
        slideNext();
        indicators()
    }
}

autoSliding();

// Parar o slide automatico quando o mouse passar sobre
const slide = document.querySelector('.slide');
slide.addEventListener('mouseover', function(){
    clearInterval(deletInterval);
})

// Retomar o deslizamento quando o mouse estiver desligado
slide.addEventListener('mouseout', autoSliding);

// Adicionar e remove a classe active dos indicadores
function indicators(){
    for(i=0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace('active', ' ');
    };
    dots[counter].classList += ' active';
}

function switchImage(currentImage){
    currentImage.classList.add('active');
    var imageId = currentImage.getAttribute('attr');

    if(imageId > counter){
        slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
        counter = imageId;
        slideImages[counter].style.animation = 'next2 0.5s ease-in forwards'
    } else if(imageId == counter){
        return;
    } else {
        slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards'
        counter = imageId;
        slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards'
    }
    indicators()
}