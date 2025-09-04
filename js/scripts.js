import Services from "./services.js";
import Popup from "./popup.js";
import FormHandler from "./formHandler.js";
import FormOrderHandler from "./formOrderHandler.js";

$(document).ready(function(){
    new WOW({
        animateClass: "animate__animated",
    }).init();

    const url = 'https://testologia.ru/checkout';

    $('.masters__sliders').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        adaptiveHeight: true,
        infinite: true,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 }
            }
        ]
    })

    $('.socials__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        infinite: true,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            }
        ]
    })

    $('#burger').click(function () {
        $('#menu').addClass('open');
        $('body').addClass('no-scroll');
    });

    $('#menu *').on('click', (event) => {
        $('#menu').removeClass('open');
        $('body').removeClass('no-scroll');
        event.stopPropagation();
    });

    let services = {
        haircut: {
            names: ['Стрижка мужская', 'Стрижка удлиненная', 'Стрижка машинкой', 'Стрижка детская', 'Стрижка бороды'],
            shortNames: ['Мужская', 'Удлиненная', 'Машинкой', 'Детская', 'Бороды'],
            descriptions: ['Подбор стрижки, 2 мытья, укладка', 'Подбор стрижки, 2 мытья, укладка', 'Без ножниц', 'От 4 до 14 лет включительно, не удлиненная', 'С распариванием и окантовкой бритвой шаветт'],
            shortDescriptions: ['Подбор, мытье, укладка', 'Подбор, мытье, укладка', 'Без ножниц', 'От 4 до 14 лет', 'Распар и окант'],
            prices: ['1400 руб.', '2100 руб.', '950 руб.', '1100 руб.', '950 руб.'],
            shortPrices: ['1400 р.', '2100 р.', '950 р.', '1100 р.', '950 р.'],
        },
        shaving: {
            names: ['Бритье опасной бритвой', 'Бритье с уходом', 'Бритье головы', 'Моделирование бороды и усов'],
            shortNames: ['Классическое', 'Королевское', 'Головы', 'Модели рование'],
            descriptions: [
                'Горячее полотенце',
                'Двойное распаривание',
                'Полное бритье головы опасной бритвой',
                'Коррекция формы, бритье контуров, уход'
            ],
            shortDescriptions: ['Полотенце, шаветт', '2 распара, уход', 'Бритье бритвой', 'Форма и контур'],
            prices: ['1200 руб.', '1700 руб.', '1300 руб.', '1500 руб.'],
            shortPrices: ['1200 р.', '1700 р.', '1300 р.', '1500 р.'],
        },
        complex: {
            names: ['Стрижка + Бритье', 'Стрижка + Борода', 'Комплекс “Полный уход”'],
            shortNames: ['Стрижка+Бритье', 'Стрижка+Борода', 'Полный уход'],
            descriptions: [
                'Стрижка любой сложности и классическое бритье',
                'Стрижка и моделирование бороды',
                'Стрижка, бритье, уход за кожей лица, укладка'
            ],
            shortDescriptions: ['Стрижка+бритье', 'Стрижка+борода', 'Все в одном'],
            prices: ['2400 руб.', '2200 руб.', '3500 руб.'],
            shortPrices: ['2400 р.', '2200 р.', '3500 р.'],
        },
        additionally: {
            names: ['Мытьё головы и укладка', 'Камуфляж седины', 'Коррекция усов', 'Массаж головы'],
            shortNames: ['Мытьё+Укладка', 'Камуфляж', 'Усы', 'Массаж'],
            descriptions: [
                'Профессиональное мытьё шампунем и укладка',
                'Тонирование волос для естественного оттенка',
                'Окантовка и коррекция формы усов',
                'Расслабляющий массаж головы после стрижки'
            ],
            shortDescriptions: ['Мытьё, укладка', 'Тонирование', 'Форма усов', 'Расслабление'],
            prices: ['600 руб.', '1200 руб.', '500 руб.', '700 руб.'],
            shortPrices: ['600 р.', '1200 р.', '500 р.', '700 р.'],
        }
    }

    const formHandler = new FormHandler('.popup__form', url);
    const formOrderHandler = new FormOrderHandler('.task__form', url);

    new Services(services);
    new Popup('#popup', '.phone__btn', '.popup__close', formHandler);
    new Popup('#popupTask', '.order__button', '.popup__close', formOrderHandler);
    new Popup('#popupDiscount', '.discount__button', '.popup__close', null)
})