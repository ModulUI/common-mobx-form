import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {PassportNumberInput} from 'modul-components';
import radValidateHoc from './../radValidateHoc';

@observer
class PassportNumberField extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        className: PropTypes.string,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        validator: PropTypes.object,
        field: PropTypes.object,
    };
    static defaultProps = {
        disabled: false,
        readOnly: false,
        className: '',
        type: 'text',
    };

    componentDidMount() {
        this.props.field.setFocus = ::this.setFocus;
    }

    setFocus() {
        this.input.setFocus();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.field.focused && nextProps.field.autoFocus) { this.input.focus(); }
        this.props.field.setFocus = ::this.setFocus;
    }

    onChange = (e) => {
        this.props.onChange && this.props.onChange(e);
        this.props.field.onChange(e);
    };

    render() {
        const {type, placeholder, field, className, disabled, readOnly} = this.props;
        const {tooltip, addClassName} = this.props.validator;
        const classNames = `${ className } ${ addClassName }`;

        return (
            <PassportNumberInput {...field.bind({type, placeholder})}
                ref={input => this.input = input}
                className={classNames}
                type={type}
                disabled={disabled}
                readOnly={readOnly}
                {...tooltip}
                onChange={::this.onChange} />
        );
    }
}

export default observer(radValidateHoc()(PassportNumberField));

