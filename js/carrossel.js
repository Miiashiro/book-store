const btnNext = document.getElementById('nextSlide')
const btnPrev = document.getElementById('prevSlide')
const slider = document.querySelector('.slider')
const contentImg = document.querySelector('.content-image')

const { width: slideWidth} = window.getComputedStyle(slider)
const { width: contentWidth} = window.getComputedStyle(contentImg)

const slideProps = {
    width: parseInt(slideWidth),
    scroll: 0
}

function controlSlide({target: {id}}){
    switch(id){
        case 'nextSlide': {
            if(slideProps.scroll + slideProps.width < parseInt(contentWidth)){
                slideProps.scroll += slideProps.width
            }
            return slider.scrollLeft = slideProps.scroll
        }

        case 'prevSlide':
            slideProps.scroll = slideProps.scroll - slideProps.width < 0 ? 0 : slideProps.scroll - slideProps.width 
            return slider.scrollLeft = slideProps.scroll
        
        default:
            break;
    }
}

btnNext.addEventListener('click', controlSlide)
btnPrev.addEventListener('click', controlSlide)

function automaticNextImage(){
    if((slideProps.scroll + slideProps.width) < parseInt(contentWidth)){
        slideProps.scroll += slideProps.width
    } else {
        slideProps.scroll = 0;
    }

    return slider.scrollLeft = slideProps.scroll
}

setInterval( function(){
    automaticNextImage()
}, 8000)