import {observable, action} from 'mobx';
import Form from 'mobx-react-form';
import BaseField from './BaseField';

const errorsNotEmpty = err => Object.keys(err).map(p => err[p] !== null).includes(true);

export default class BaseForm extends Form {

    options() {
        return {
            validateOnChange: true,
            validationDebounceWait: 50
        };
    }

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
        super(fieldsObj, {hooks, plugins, options});
        // До super(...props) вызывать this нельзя
        this.customOnSuccess = customOnSuccess;
        this.customOnError = customOnError;
    }

    @observable submitFailed = false

    @action
    afterFailedSubmit() {
        this.submitFailed = true;
    }

    @action
    afterSuccessSubmit() {
        this.submitFailed = false;
    }

    makeField(props) {
        return new BaseField({...props});
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

    // Рекурсия позволяет показывать ошибки на массивах
    static findError(form) {
        if (!form) {
            return;
        }
        const arr = [];
        form.fields.forEach(f => arr.push(f));
        const errors = form.errors();
        const errField = arr.find(f => f.errors() && errorsNotEmpty(f.errors()));
        if (errField && typeof errors[errField.name] === 'string') {
            errField && errField.setFocus instanceof Function && errField.setFocus();
        } else {
            BaseForm.findError(errField);
        }
    }
}
