export default class Popup {
    constructor(popupSelector, openBtnSelector, closeBtnSelector, formHandler) {
        this.popup = $(popupSelector);
        this.openBtn = $(openBtnSelector);
        this.closeBtn = $(closeBtnSelector);
        this.error = this.popup.find('.error-input');
        this.formHandler = formHandler;

        this.init();
    }

    init() {
        this.openBtn.on('click', (e) => {
            e.preventDefault();
            this.open(e.currentTarget);
        })
        this.closeBtn.on('click', () => this.close());
        this.popup.on('click', (e) => {
            if (e.target.id === this.popup.attr('id')) this.close();
        });
    }

    open(trigger) {
        this.popup.addClass('active');
        if (this.formHandler) {
            this.formHandler.resetForm();

            if(trigger && $(trigger).closest('.sliders__item').length) {
                const barberName = $(trigger)
                    .closest('.sliders__item')
                    .find('.sliders__item-text')
                    .text()
                    .trim()
                this.formHandler.setMaster(barberName);
            }
        }
        this.popup.find('input:first').focus();
    }

    close() {
        this.popup.removeClass('active');
        this.error.hide();
    }
}