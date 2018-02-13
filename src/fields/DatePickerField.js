import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
// import {DatePicker} from 'modul-components';
import {DatePicker} from '../../../inputs/src';
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
      console.log(this.domInput.datetimepicker);
      if(this.domInput && this.domInput[0]){
          this.domInput[0].autocomplete = 'off';
      }
  }

  componentWillReceiveProps (nextProps) {
      if(this.props.field === nextProps.field) nextProps.field.setFocus = ::this.setFocus;
  }

  handleChange(date) {
      const {field} = this.props;
      const newDate = new Date(Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()));
      if (field.onChange) field.onChange(newDate);

      // if (field.onChange) field.onChange(this.createDateAsUTC(date));
      // console.log(field.value);
      // console.log(this.createDateAsUTC(date));
      // console.log(field.value);
      // if (field.onChange) field.onChange(this.createDateAsUTC(date));
      // field.value = this.createDateAsUTC(field.value);
      // if (field.onChange) field.onChange(this.createDateAsUTC(date));
  }

  get domInput() { return this.input && this.input.$input; }

  get date() {
      let date = this.props.field.value;
      if(typeof date === 'string') date = new Date(date);
      // Если null - подставит в input текущую дату
      return date || undefined;
  }

  // createDateAsUTC = d =>
  //     Object.prototype.toString.call(d) === '[object Date]' ?
  //         d.setMinutes(d.getMinutes() + d.getTimezoneOffset() - 420) : d
  
  // createDateAsUTC = d =>
  //     Object.prototype.toString.call(d) === '[object Date]' ?
  //         new Date(Date.UTC(
  //             d.getFullYear(),
  //             d.getMonth(),
  //             d.getDate(),
  //             d.getHours(),
  //             d.getMinutes(),
  //             d.getSeconds())) : d

  render() {
      const {field, className, disabled, readOnly, validator, ...other} = this.props;
      const {tooltip, addClassName} = validator;
      const classNames = `${ className } ${ addClassName }`;
      // const onChange = date => this.handleChange(this.createDateAsUTC(date));
      const onChange = ::this.handleChange;
      const value = this.date;
      return (
          <DatePicker {...tooltip}
              {...field.bind({value})}
              {...other}
              onChange={onChange}
              className={classNames}
              ref={input => this.input = input}
              disabled={disabled}
              readOnly={readOnly}/>
      );
  }
}
export default observer(radValidateHoc()(DatePickerField));
