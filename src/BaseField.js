import {Field} from 'mobx-react-form';
import {computed, observable, toJS} from 'mobx';

class BaseField extends Field {
  constructor(props) {
    super(props);
    this.$hint = props.data && props.data.hint;
  }

  @observable $hint

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
