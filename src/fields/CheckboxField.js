import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
class CheckboxField extends React.Component {
    static defaultProps = {
        field: {
            id: ''
        }
    };

	static propTypes = {
		placeholder: PropTypes.string,
		field: PropTypes.object,
		classContainer: PropTypes.string,
	};

	get inputId() {
	    return this.props.field.id || Math.random().toString(36).substring(7);
    }

	render() {
		const {placeholder, field, classContainer, tabIndex} = this.props;
		return (
			<div className={classContainer}>
				<input type='checkbox'
					   tabIndex={tabIndex}
                       {...field.bind({checked: field.value})}
                       id={this.inputId} />
				<label htmlFor={this.inputId}
					   className='label_check'>
					<i className='icon'/>
					<span className='f_small'>{placeholder}</span>
				</label>
			</div>
		);
	}
}

export default CheckboxField;
