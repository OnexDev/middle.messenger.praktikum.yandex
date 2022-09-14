import template from './form.hbs';
import * as styles from './form.scss';
import Block, { BlockProps } from '../../utils/Block';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import Field, { FieldProps } from '../field';
import Input from '../input';
import Button, { ButtonProps } from '../button';

interface FormProps extends BlockProps{
    fields: FieldProps[],
    submitButton: ButtonProps,
    onSubmit?: (form: Record<string, string>) => void;
}

export default class Form extends Block {
  private isValidForm: Boolean = true;

  private form: Record<string, string> = {};

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',

    SUBMIT: 'action:submit',
    VALIDATE: 'action:validate',
  };

  constructor(props: FormProps) {
    super('form', getPropsWithAugmentedClasses<FormProps>(
      {
        ...props,
        events: {
          submit: (event) => {
            event.preventDefault();
          },
        },
      },
      [styles.form],
      [],
    ));
    this.eventBus().on(Form.EVENTS.SUBMIT, this._submit.bind(this));
    this.eventBus().on(Form.EVENTS.VALIDATE, this._validate.bind(this));
  }

  private _validate = () => {
    this.isValidForm = true;

    this.childrenCollection.fields.forEach((field: Field) => {
      const input = field.getFieldValue() as Input;
      const validator = field.getValidator();
      let isValidInput = true;

      if (validator instanceof Function) {
        isValidInput = validator(input.getValue() ?? '');
      }

      if (!isValidInput) {
        this.isValidForm = false;
        // Костыль, Object.assign
        // @ts-ignore
        field.setProps({ errors: ['Проверьте поле'] });
      } else {
        // Костыль, Object.assign
        // @ts-ignore
        field.setProps({ errors: [] });
      }
    });

    this.validate();
  };

  public dispatchFormDidSubmit() {
    this.eventBus().emit(Form.EVENTS.VALIDATE);
  }

  private _submit = () => {
    this.eventBus().emit(Form.EVENTS.VALIDATE);
    if (this.isValidForm) {
      this.submit();
    } else {
      console.error('Валидация была завершена с ошибками.', this.form);
    }
  };

  protected validate = () => {

  };

  protected submit = () => {
    this.props.onSubmit(this.form);
  };

  init() {
    this.props.attrs.name = this.id;
    this.childrenCollection.fieldsCollection = this.props.fields.map((field: FieldProps) => new Field(
      {
        ...field,
        isFormField: true,
        inputEvents: {
          ...field.events,
          input: (event: InputEvent & {target: HTMLInputElement}) => {
            this.form[field.name] = event.target?.value;
          },
          focus: () => {
            this.eventBus().emit(Form.EVENTS.VALIDATE);
          },
          blur: () => {
            this.eventBus().emit(Form.EVENTS.VALIDATE);
          },
        },
      },
    ));
    this.children.submitButton = new Button({
      ...this.props.submitButton,
      events: {
        ...this.props.submitButton.events,
        click: () => this.eventBus().emit(Form.EVENTS.SUBMIT),
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
