import {Field} from 'mobx-react-form';
import {computed, observable, toJS, action, autorun, observe} from 'mobx';

class BaseField extends Field {
    constructor(props, form) {
        super(props);
        this.$hint = props.data && props.data.hint;

        const disposer = observe(this, '$focused', ($focused) => {
            if ($focused.newValue) {
                const disposer2 = observe(this, '$focused', ($focused) => {
                    if (!$focused.newValue) {
                        this.$blured = true;
                        disposer2();
                    }
                });
                disposer();
            }
        });

        const disposer3 = observe(form, '$submitting', (submitting) => {
            if (submitting.newValue) {
                this.$wasSubmit = true;
                disposer3();
            }
        });
    }

    @observable $hint;
    @observable $blured;

    @observable $wasSubmit = false;

    @computed
    get hint() {
        return toJS(this.$hint);
    }

    get wasSubmit() {
        return this.$wasSubmit;
    }

    get blured() {
        return this.$blured;
    }

}

export default BaseField;
