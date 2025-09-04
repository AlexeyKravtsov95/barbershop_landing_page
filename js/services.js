export default class Services {
    constructor(data) {
        this.data = data;
        this.list = [
            $('#name_list'),
            $('#disc_list'),
            $('#sum_list')
        ];

        this.isMobile = window.innerWidth <= 768;
        this.init();
        this.updateLabel();
        $(window).on('resize', this.handleResize.bind(this));
    }

    init() {
        $('.services__navigation a').on('click', (e) => {
            e.preventDefault();
            let serviceType = $(e.currentTarget).attr('id')
            this.updateService(serviceType);
        });
    }

    handleResize() {
        let mobile = window.innerWidth <= 768;
        if (mobile !== this.isMobile) {
            this.isMobile = mobile;
            this.updateLabel();
            let active = $('.services__navigation a.active').attr('id') || 'haircut';
            this.updateService(active);
        }
    }

    updateLabel() {
        let complex = $('#complex');
        let additionally = $('#additionally');

        complex.text(this.isMobile ? 'Комплекс' : 'Комплексные услуги')
        additionally.text(this.isMobile ? 'Допы' : 'Дополнительные услуги')
    }


    updateService(serviceType) {
        let service = this.data[serviceType];
        this.list.forEach(item => {item.empty()});
        let name = this.isMobile ? service.shortNames : service.names;
        let disc = this.isMobile ? service.shortDescriptions : service.descriptions;
        let prices = this.isMobile ? service.shortPrices : service.prices;

        [name, disc, prices].forEach((arr, index) => {
            arr.forEach(item => {
                this.list[index].append($('<li></li>').text(item));
            });
        });
    }
}