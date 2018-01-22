import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import {AmountInput} from 'modul-components';
import radValidateHoc from './../radValidateHoc';

@observer
class AmountField extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
    addClassName: PropTypes.string,
    maxLength: PropTypes.number,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    field: PropTypes.object,
    validator: PropTypes.object,
  };
  static defaultProps = {
    disabled: false,
    readOnly: false,
    className: '',
    maxLength: 255,
    type: 'text',
  }

  setFocus() {
    this.input.setFocus();
  }

  componentWillReceiveProps (nextProps) {
    if(this.props.field === nextProps.field) nextProps.field.setFocus = ::this.setFocus;
  }

  componentDidMount() {
    this.props.field.setFocus = ::this.setFocus;
  }

  render() {
    const {type, placeholder, field, className, disabled, readOnly, maxLength} = this.props;
    const {tooltip, addClassName} = this.props.validator;
    const classNames = `${ className } ${ addClassName }`;
    return (
      <AmountInput {...field.bind({type, placeholder})}
        ref={input => this.input = input}
        type={type}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        {...tooltip} />
    );
  }
}
export default observer(radValidateHoc()(AmountField));
