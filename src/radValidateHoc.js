import {ReactTooltip} from 'modul-components';
import React from 'react';
// todo: observable observer
/**
 * HOC для обертки над инпутами, чтобы получить необходимые методы подсветки ошибок и т.д.
 * getTooltipError - текст ошибки для тултипа
 * isError - флаг ошибки
 * isSuccess - флаг валидности поля
 * addClassName - css класс success|error
 * tooltip: tooltip - конфиг для тултипа, который внедреятся в <input/>
 *
 * tips - включены ли подскажи тултипа
 */
function radValidate({tips} = {tips: true}) {
  return (WrappedComponent) => {
    class radValidateTooltip extends React.Component {

      constructor(props, context) {
        super(props, context);
        this.validatorId = Math.floor(Math.random() * (999999999 - 100000000)) + 100000000;
        this.tooltipId = `tooltip_${ this.validatorId }`;
      }

      getError() {
        return this.props.field.error;
      }

      showTooltipError() {
        const {field: {hasError, error, touched, submitFailed, isPristine}} = this.props;
        return hasError && error && (submitFailed || touched);
      }
      // TODO: showTooltipHint
      // showTooltipHint() {
      //   const {field: {hasError, error, touched, submitFailed, isPristine}} = this.props;
      //   return hasError && error && (submitFailed || touched);
      // }

      getTooltipProps(tipPlace) {
        const self = this;
        return {
          html: true,
          multiline: true,
          getContent: [::self.getError, 200],
          type: 'error',
          event: 'focus',
          eventOff: 'blur keydown',
          place: tipPlace || 'right',
          delayHide: 0,
          effect: 'solid',
          resizeHide: true,
        };
      }

      getHintTooltipProps(tipPlace) {
        const self = this;
        return {
          html: true,
          multiline: true,
          getContent: [() => self.props.field.hint, 200],
          type: 'info',
          event: 'focus',
          eventOff: 'blur keydown',
          place: tipPlace || 'right',
          delayHide: 0,
          effect: 'solid',
          resizeHide: true,
        };
      }

      getTooltipConfig({id}) {
        return {
          'data-for': id,
          'data-tip': '',
        };
      }


      render() {
        const {field, hideTips = false, wrapperClassName = ''} = this.props;
        const {tipPlace, ...wrappedProps} = this.props;
        const {isValid, hasError, focused, touched, submitFailed, hint} = field;

        const tooltip = this.getTooltipConfig({id: this.tooltipId});

        const highlightError = (!isValid || hasError) && (touched || submitFailed) && !focused;
        const highlightSuccess = (isValid || !hasError) && touched && !focused;
        const addClassName = `${ highlightError && 'error' } ${ highlightSuccess && 'success' }`;

        const validator = {
          error: hasError,
          isError: highlightError,
          isSuccess: highlightSuccess,
          addClassName,
          tooltip,
        };

        if (tips && !hideTips) {
          const showErrorMessage = this.showTooltipError();
          const showHintMsg = !showErrorMessage && focused && hint;
          const classNameTooltip = showHintMsg || showErrorMessage ? '' : 'hidden';
          let tooltipProps = this.getHintTooltipProps(tipPlace);
          if (showErrorMessage) tooltipProps = this.getTooltipProps(tipPlace);
          return (
            <div className={wrapperClassName}>
              <WrappedComponent {...wrappedProps}
                validator={validator} />
              <ReactTooltip className={classNameTooltip}
                id={this.tooltipId} {...tooltipProps} />
            </div>
          );
        }
        return (<WrappedComponent {...this.props}
          validator={validator} />);
      }
    }

    return radValidateTooltip;
  };
}

export default radValidate;
