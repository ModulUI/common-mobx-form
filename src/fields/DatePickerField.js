import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import {DatePicker} from 'modul-components';
import radValidateHoc from './../radValidateHoc';

@observer
class DatePickerField extends React.Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    format: PropTypes.string,
    validator: PropTypes.object,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    lang: PropTypes.string,
    formatDate: PropTypes.string,
    formatTime: PropTypes.string,
    step: PropTypes.number,
    closeOnDateSelect: PropTypes.func,
    timepicker: PropTypes.bool,
    datepicker: PropTypes.bool,
    weeks: PropTypes.string,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    startDate: PropTypes.any,
    defaultDate: PropTypes.any,
    defaultTime: PropTypes.any,
    todayButton: PropTypes.bool,
    defaultSelect: PropTypes.bool,
    yearStart: PropTypes.number,
    yearEnd: PropTypes.number,
    disabledDates: PropTypes.array,
    allowDates: PropTypes.array,
    allowDateRe: PropTypes.string,
    disabledWeekDays: PropTypes.bool,
    id: PropTypes.string,
    inline: PropTypes.bool,
  };
  static defaultProps = {
    disabled: false,
    readOnly: false,
    className: '',
    maxLength: 255,
    type: 'text',
    defaultDate: new Date(),
  }

  setFocus() {
    this.input.setFocus();
  }

  componentDidMount() {
    this.props.field.setFocus = ::this.setFocus;
    this.input.$input[0].autocomplete = 'off';
  }

  componentWillReceiveProps (nextProps) {
    this.input.$input[0].autocomplete = 'off';
    if(this.props.field === nextProps.field) nextProps.field.setFocus = ::this.setFocus;
  }

  render() {
    const {field, className, disabled, readOnly, validator, ...other} = this.props;
    const {tooltip, addClassName} = validator;
    const classNames = `${ className } ${ addClassName }`;
    let value = field.$value || '';
    if (field.$value && typeof field.$value === 'string') {
      value = new Date(field.$value);
    }
    return (
      <DatePicker {...other}
        {...field.bind({readOnly, value})}
        className={classNames}
        ref={input => this.input = input}
        disabled={disabled}
        readOnly={readOnly}
        {...tooltip} />
    );
  }
}
export default observer(radValidateHoc()(DatePickerField));
