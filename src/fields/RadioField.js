import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
class RadioField extends React.Component {
    static propTypes = {
        placeholders: PropTypes.array,
        field: PropTypes.object,
        values: PropTypes.array,
        checked: PropTypes.bool,
        itemCss: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.inputId = Math.random().toString(36).substring(7);
    }

    handleChange(value) {
        this.props.field.value = value;
    }

    render() {
        const {placeholders, field, values, itemCss} = this.props;
        return (
            <div>
                {
                    values.map((value, i) =>
                        <div key={i} className={itemCss}>
                            <input id={`${ this.inputId }item${ i }`}
                                checked={field.value === value}
                                {...field.bind({
                                    id: `${ field.path }item${ i }`,
                                    value,
                                    checked: field.value === value,
                                    name: field.path,
                                })}
                                type='radio'/>
                            <label htmlFor={`${ this.inputId }item${ i }`}
                                className='label_check'
                                onClick={() => this.handleChange(value)}>
                                <i className='icon'/>
                                <span className='f_small'>{placeholders[i]}</span>
                            </label>
                        </div>)
                }
            </div>
        );
    }
}

export default RadioField;
