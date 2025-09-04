export default class FormHandler {

     constructor(formSelector, url) {
        this.form = $(formSelector);
        this.url = url;
        this.name = this.form.find('#nameInput');
        this.phone = this.form.find('#phoneInput');
        this.fields = [this.name, this.phone];
        this.error = $('.error-input');
        this.content = $('.popup__content');
        this.title =  $('.popup__title');
        this.subtitle = $('.popup__subtitle');
        this.init();
    }


    init() {
        this.phone.inputmask({"mask": "7 (999) 999-999"});

        $('.btn-submit').on('click', (e) => {
            e.preventDefault();
            this.submit();
        })
    }

    submit() {
        let hasError = false;
        this.error.hide();

        this.fields.forEach(field => {
            if (!field.val()) {
                field.next().show();
                hasError = true;
            }
        });

        if (!hasError) {
            $.ajax({
                method: 'POST',
                url: this.url,
                data: { name: this.name.val(), phone: this.phone.val() }
            })
                .done((response) => {
                    if (response.success === 1) {
                        this.displaySuccessText();
                    } else {
                        alert("Ошибка при оформлении заказа, позвоните нам");
                    }
                });
        }
    }

    displaySuccessText() {
        this.form.hide();
        this.subtitle.hide();
        this.content.addClass('popup__success');
        this.title.text('Спасибо, мы свяжемся с вами!');
    }

    resetForm() {
        this.content.removeClass('popup__success');
        this.form.show();
        this.fields.forEach(field => {
            field.val('');
        });
        this.title.text('Заказать звонок');
        this.subtitle.show();
    }
}