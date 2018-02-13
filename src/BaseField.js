import {Field} from 'mobx-react-form';
import {computed, observable, toJS, action, autorun, observe} from 'mobx';

class BaseField extends Field {
    constructor(props) {
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


    }

    @observable $hint;
    @observable $blured;

    @computed
    get hint() {
        return toJS(this.$hint);
    }

    @computed
    get submitFailed() {
        return this.state.form.submitFailed;
    }
}

export default BaseField;
