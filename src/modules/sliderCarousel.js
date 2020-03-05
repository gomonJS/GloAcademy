'use strict';

class SliderCarousel {

    constructor({
        main, 
        wrap, 
        prev, 
        next, 
        infinity = false,
        position = 0, 
        slidesToShow = 3,
        responsive = []
    }) {

        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.slides = document.querySelector(wrap).children;
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow),
            maxPosition: this.slides.length - this.slidesToShow
        };
        this.responsive = responsive;
    }

    /**
     * Запуск слайдера
     */
    init() {

        try {
            this.addGloClass();
            this.addGloStyle();
    
            if (this.prev && this.next) { 
                this.controlSlider(); 
            } else {
                this.addArrow(); 
                this.controlSlider();
            }

            this.responseInit();
        } catch (e) {
            console.warn(`Не добавлены селекторы слайдера! main - wrap`);
        }
    }

    /**
     * Добавление классов
     */
    addGloClass() {

        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');

        for (const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    /**
     * Добавление стилей
     */
    addGloStyle() {

        let style = document.getElementById('sliderCarousel-style');

        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
        }
        style.textContent = `
            .glo-slider { overflow: hidden !important }
            .glo-slider__wrap {
                display: flex !important;
                transition: transform .5s !important;
                will-change: transform !important;
            }
            .glo-slider__item {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 0 0 ${this.options.widthSlide}% !important;
                margin: auto !important;
            }
            .glo-slider__prev, .glo-slider__next {
                margin: 0 8px;
                border: 15px solid transparent;
                background: transparent;
            }
            .glo-slider__prev {
                border-right-color: #19b5fe;
            }
            .glo-slider__next {
                border-left-color: #19b5fe;
            }
            .glo-slider__prev:hover, 
            .glo-slider__next:hover,
            .glo-slider__prev:focus, 
            .glo-slider__next:focus {
                outline: none;
                background: transparent;
            }
        `;

        document.head.append(style);
    }

    controlSlider() {

        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider() {

        if (this.options.infinity || this.options.position > 0) {

            --this.options.position;

            if (this.options.position < 0) {
                this.options.position = this.options.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    nextSlider() {

        if (this.options.infinity || this.options.position < this.options.maxPosition) {

            ++this.options.position;
            
            if (this.options.position > this.options.maxPosition) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    addArrow() {

        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';

        this.main.append(this.prev);
        this.main.append(this.next);
    }

    responseInit() {

        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map((item) => {

            return item.breakpoint;
        });
        const maxResponse = Math.max(...allResponse);

        const checkResponse = () => {

            const widthWindow = document.documentElement.clientWidth;

            if (widthWindow < maxResponse) {
                
                for (let i = 0; i < allResponse.length; i++) {

                    if (widthWindow < allResponse[i]) {

                        this.slidesToShow = this.responsive[i].slideToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addGloStyle();
                    }
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addGloStyle();
            }
        };
        checkResponse();

        window.addEventListener('resize', checkResponse);
    }
}

export default SliderCarousel;