import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import {NumberInput} from 'modul-components';
import radValidateHoc from './../radValidateHoc';


@observer
class NumberField extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        className: PropTypes.string,
        maxLength: PropTypes.number,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        field: PropTypes.object,
        validator: PropTypes.object,
        float: PropTypes.bool,
        precision: PropTypes.number,
        autoComplete: PropTypes.string,
        autoCorrect: PropTypes.string,
        spellCheck: PropTypes.string,
    };
    static defaultProps = {
        disabled: false,
        readOnly: false,
        className: '',
        maxLength: 255,
        type: 'text',
        autoComplete: 'off',
        autoCorrect: 'off',
        spellCheck: 'off',
    }

    setFocus() {
        this.input.setFocus();
    }

    componentDidMount() {
        this.props.field.setFocus = ::this.setFocus;
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.field.focused && nextProps.field.autoFocus) {
            this.input.focus();
        }
        if (this.props.field === nextProps.field) nextProps.field.setFocus = ::this.setFocus;
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
            maxLength,
            float,
            tabIndex,
            autoComplete,
            autoCorrect,
            spellCheck,
        } = this.props;
        const {tooltip, addClassName} = this.props.validator;
        const classNames = `${ className } ${ addClassName }`;
        return (
            <NumberInput {...field.bind({type, placeholder})}
                maxLength={maxLength}
                ref={input => this.input = input}
                className={classNames}
                type={type}
                float={float}
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

export default observer(radValidateHoc()(NumberField));
