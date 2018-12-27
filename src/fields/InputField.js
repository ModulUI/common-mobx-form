import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import radValidateHoc from './../radValidateHoc';

@observer
class InputField extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        className: PropTypes.string,
        maxLength: PropTypes.number,
        placeholder: PropTypes.string,
        field: PropTypes.shape({ value: PropTypes.string }),
        validator: PropTypes.object,
        id: PropTypes.string,
        type: PropTypes.string,
        autoComplete: PropTypes.string,
        autoCorrect: PropTypes.string,
        spellCheck: PropTypes.string,
    };

    static defaultProps = {
        disabled: false,
        readOnly: false,
        className: '',
        maxLength: 255,
        autoComplete: 'off',
        autoCorrect: 'off',
        spellCheck: 'off',
    };

    setFocus() {
        this.props.mask ? this.input.getInputDOMNode().focus() : this.input.focus();
    }

    componentDidMount() {
        this.props.field.setFocus = ::this.setFocus;
    }

    componentWillReceiveProps(nextProps) {
        // if (!nextProps.field.focused && nextProps.field.autoFocus) { this.input.focus(); }
        if (this.props.field === nextProps.field) nextProps.field.setFocus = ::this.setFocus;
    }

    render() {
        const {
            placeholder,
            field,
            className,
            disabled,
            readOnly,
            id,
            maxLength,
            type,
            tabIndex,
            mask,
            autoComplete,
            autoCorrect,
            spellCheck,
        } = this.props;
        const {tooltip, addClassName} = this.props.validator;
        const classNames = `${ className } ${ addClassName }`;
        return (
            mask ?
                <InputMask {...field.bind({placeholder, type, setFocus: this.setFocus})}
                    id={id} mask={mask}
                    ref={input => this.input = input}
                    className={classNames}
                    disabled={disabled}
                    readOnly={readOnly}
                    tabIndex={tabIndex}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                    spellCheck={spellCheck}
                    {...tooltip} />
                :
                <input {...field.bind({placeholder, type, setFocus: this.setFocus})}
                    id={id}
                    maxLength={maxLength}
                    ref={input => this.input = input}
                    className={classNames}
                    disabled={disabled}
                    readOnly={readOnly}
                    tabIndex={tabIndex}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                    spellCheck={spellCheck}
                    {...tooltip} />
        );
    }
}

export default observer(radValidateHoc()(InputField));
