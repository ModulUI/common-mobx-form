import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import radValidateHoc from './../radValidateHoc';

@observer
class InputField extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        className: PropTypes.string,
        maxLength: PropTypes.number,
        placeholder: PropTypes.string,
        field: PropTypes.object,
        validator: PropTypes.object,
        id: PropTypes.string,
        type: PropTypes.string,
    };

    static defaultProps = {
        disabled: false,
        readOnly: false,
        className: '',
        maxLength: 255,
    };

    setFocus() {
        this.input.focus();
    }

    componentDidMount() {
        this.props.field.setFocus = ::this.setFocus;
    }

    componentWillReceiveProps(nextProps) {
        // if (!nextProps.field.focused && nextProps.field.autoFocus) { this.input.focus(); }
        if (this.props.field === nextProps.field) nextProps.field.setFocus = ::this.setFocus;
    }

    render() {
        const {placeholder, field, className, disabled, readOnly, id, maxLength, type} = this.props;
        const {tooltip, addClassName} = this.props.validator;
        const classNames = `${ className } ${ addClassName }`;
        return (
            <input {...field.bind({placeholder, type, setFocus: this.setFocus})}
                id={id}
                maxLength={maxLength}
                ref={input => this.input = input}
                className={classNames}
                disabled={disabled}
                readOnly={readOnly}
                {...tooltip} />
        );
    }
}

export default observer(radValidateHoc()(InputField));
