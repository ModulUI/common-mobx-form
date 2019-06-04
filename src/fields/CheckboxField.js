import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class CheckboxField extends React.Component {
    static propTypes = {
      placeholder: PropTypes.string,
      field: PropTypes.object,
      classContainer: PropTypes.string,
      tabIndex: PropTypes.any,
      disabled: PropTypes.bool,
    };

    constructor(props) {
      super(props);
      this.inputId = Math.random().toString(36).substring(7);
    }

    handleChange = () => {
      const { field, disabled } = this.props;

      if(disabled) {
        return false;
      }

      field.value = !field.value;
      if (field.onChange) {
        field.onChange(field.value);
      }
    };

    render() {
      const { placeholder, field, classContainer, tabIndex, disabled } = this.props;

      return (
        <div className={classContainer}>
          <input id={this.inputId}
            type='checkbox'
            disabled={disabled}
            tabIndex={tabIndex}
            {...field.bind({ checked: field.value })} />
          <label htmlFor={this.inputId}
            className='label_check'
            onClick={this.handleChange}>
            <i className='icon' />
            <span className='f_small'>{placeholder}</span>
          </label>
        </div>
      );
    }
}

export default CheckboxField;
