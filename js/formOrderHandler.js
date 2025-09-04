export default class FormHandler {
    constructor(formSelector, url) {
        this.form = $(formSelector);
        this.url = url;
        this.name = this.form.find('#taskNameInput');
        this.phone = this.form.find('#taskPhoneInput');
        this.service = this.form.find('#taskServiceInput');
        this.master = this.form.find('#taskMasterInput');
        this.date = this.form.find('#taskDateInput');
        this.time = this.form.find('#taskTimeInput');
        this.fields = [this.name, this.phone, this.service, this.master, this.date, this.time];
        this.error = $('.error-input');
        this.field = $('.task__field');
        this.man = $('.task__man');
        this.title = $('.task__title');
        this.subtitle = $('.task__text');

        this.init();
    }

    init() {
        this.phone.inputmask({"mask": "7 (999) 999-999"});
        this.date.datepicker({
            minDate: 0
        });

        this.time.timepicker({
            timeFormat: 'HH:mm',
            interval: 30,
            minTime: '10',
            maxTime: '18:00pm',
            defaultTime: '11',
            startTime: '10:00',
            dynamic: true,
            dropdown: true,
            scrollbar: true,
        })

        $('#taskSubmit').on('click', (e) => {
            e.preventDefault();
            this.submit();
        })
    }

    setMaster(name) {
        let mapping = {
            'Барбер Алексей': 'alexey',
            'Барбер Роман': 'roman',
            'Барбер Дмитрий': 'dmitriy',
            'Барбер Иван': 'ivan'
        };

        let value = mapping[name];
        this.master.val(value);
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
                data: {
                    name: this.name.val(),
                    phone: this.phone.val(),
                    service: this.service.val(),
                    master: this.master.val(),
                    date: this.date.val(),
                    time: this.time.val(),
                }
            })
                .done((response) => {
                    if (response.success === 1) {
                        this.displaySuccessForm();
                    } else {
                        alert("Ошибка при оформлении заказа, позвоните нам");
                    }
                });
        }
    }

    displaySuccessForm() {
        this.form.hide();

        this.field.addClass('success__form');
        this.man.addClass('success__man');
        this.title.text('Спасибо за ваш заказ!');
        this.subtitle.addClass('success__form-text').text('Мы перезвоним вам для уточнения данных в течении 5 минут.');
    }

    resetForm() {
        this.field.removeClass('success__form');
        this.form.show();
        this.man.removeClass('success__man');
        this.title.text('Оформить заявку');
        this.subtitle.text('Мы перезвоним вам в течении 5 минут');
        this.fields.forEach(field => {
            field.val('');
        });
        this.error.hide();
    }
}