import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import {PhoneInput} from 'modul-components';
import radValidateHoc from './../radValidateHoc';


@observer
class PhoneField extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        className: PropTypes.string,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        validator: PropTypes.object,
        field: PropTypes.object,
        autoComplete: PropTypes.string,
        autoCorrect: PropTypes.string,
        spellCheck: PropTypes.string,
    };
    static defaultProps = {
        disabled: false,
        readOnly: false,
        className: '',
        type: 'text',
        autoComplete: 'off',
        autoCorrect: 'off',
        spellCheck: 'off',
    };

    componentDidMount() {
        this.props.field.setFocus = ::this.setFocus;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.field.focused && nextProps.field.autoFocus) {
            this.input.focus();
        }
        if (this.props.field === nextProps.field) nextProps.field.setFocus = ::this.setFocus;
    }

    setFocus() {
        this.input.setFocus();
    }

    onChange = (e) => {
        this.props.onChange && this.props.onChange(e);
        this.props.field.onChange(e);
    };

    render() {
        const {
            type,
            placeholder,
            field,
            className,
            disabled,
            readOnly,
            tabIndex,
            autoComplete,
            autoCorrect,
            spellCheck,
        } = this.props;
        const {tooltip, addClassName} = this.props.validator;
        const classNames = `${ className } ${ addClassName }`;

        return (
            <PhoneInput {...field.bind({type, placeholder})}
                ref={input => this.input = input}
                className={classNames}
                type={type}
                disabled={disabled}
                readOnly={readOnly}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                spellCheck={spellCheck}
                {...tooltip}
                tabIndex={tabIndex}
                onChange={::this.onChange}/>
        );
    }
}

export default observer(radValidateHoc()(PhoneField));
