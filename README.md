** Not for production. Does not contain documentation. **
# common-mobx-form

## Пример:
```
import React from 'react';
import BaseForm, {TextareaField} from 'common-mobx-form';

const fields = ['text'];
const isRequired = message => ({field}) => {
  const isValid = !!field.value;
  return [isValid, message];
};
const validators = {comment: [isRequired('Обязательное поле')]};

class MobxText extends React.Component {
  constructor(props) {
    super(props);
    this.form = new BaseForm({fields, validators}, {
      hooks: {
        onSuccess() { console.log('ok') },
        onError() {console.log('error') }},
    });
  }
  render() {
      <TextareaField field={this.form.$('text')}/>
    );
  }
}
```