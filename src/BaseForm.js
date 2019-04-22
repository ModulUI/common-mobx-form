import {observable, action} from 'mobx';
import Form from 'mobx-react-form';
import BaseField from './BaseField';
import vjf from 'mobx-react-form/lib/validators/VJF';
export default class BaseForm extends Form {

    @observable submitFailed;

    constructor(fieldsObj, {hooks, plugins, options}) {
        let customOnSuccess = function () {
        };
        let customOnError = function () {
        };
        if (hooks) {
            if (hooks.onSuccess instanceof Function) {
                customOnSuccess = hooks.onSuccess;
                hooks.onSuccess = undefined;
            }

            if (hooks.onError instanceof Function) {
                customOnError = hooks.onError;
                hooks.onError = undefined;
            }
        }

        plugins = {
            ...plugins,
            vjf: vjf()
        };

        super(fieldsObj, {hooks, plugins, options});
        // До super(...props) вызывать this нельзя
        this.customOnSuccess = customOnSuccess;
        this.customOnError = customOnError;

        this.submitFailed = false;
    }

    options() {
        return {
            validateOnChange: true,
            validationDebounceWait: 50
        };
    }

    makeField(props) {
        return new BaseField({...props}, this);
    }

    hooks() {
        return {
            onSuccess(form) {
                form.afterSuccessSubmit();
                this.customOnSuccess(form);
            },
            onError(form) {
                form.afterFailedSubmit();
                BaseForm.findError(this);
                this.customOnError(form);
            },
        };
    }

    @action
    afterFailedSubmit() {
        this.submitFailed = true;
    }

    @action
    afterSuccessSubmit() {
        this.submitFailed = false;
    }

    static hasErrors(err) {
        if (!err) {
            return false;
        }
        if (err && typeof err == "string") {
            return true;
        }
        return Object.keys(err).some((item)=> {
            return typeof err[item] == 'object' ? BaseForm.hasErrors(err[item]) : err[item] != null;
        });
    };

    // Рекурсия позволяет показывать ошибки на массивах
    static findError(form) {
        if (!form) {
            return;
        }
        const arr = [];
        form.fields.forEach(f => arr.push(f));
        const errors = form.errors();
        //Поиск первой найденной ошибки
        const errField = arr.find(f => {
            return BaseForm.hasErrors(f.errors())
        });
        if (errField && typeof errors[errField.name] === 'string') {
            errField && errField.setFocus instanceof Function && errField.setFocus();
        } else {
            BaseForm.findError(errField);
        }
    }
}
