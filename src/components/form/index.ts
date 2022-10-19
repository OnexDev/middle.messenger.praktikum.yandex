import template from './form.hbs';
import styles from './form.scss';
import Block, { BlockProps } from '../../utils/Block';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import Field, { FieldProps } from '../field';
import Input from '../input';
import Button, { ButtonProps } from '../button';

export type FormType = Record<string, unknown>

interface FormProps extends BlockProps{
    fields: FieldProps[],
    submitButton: ButtonProps,
    onSubmit?: (form: FormType) => void;
}

export default class Form extends Block {
  private form: FormType = {};

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',

    SUBMIT: 'action:submit',
    VALIDATE: 'action:validate',
  };

  constructor(props: FormProps) {
    super(getPropsWithAugmentedClasses<FormProps>(
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
    ), 'form');
    this.eventBus().on(Form.EVENTS.SUBMIT, this._submit.bind(this));
    this.eventBus().on(Form.EVENTS.VALIDATE, this._validate.bind(this));
  }

  private _useCollectionValidator = (collection: Field[], callback?: { onSuccess?: () => void, onError: () => void}) => {
    let isValidCollectionFlag = true;
    collection.forEach((field: Field) => {
      this._useFieldValidator(field, {
        onSuccess: () => {},
        onError: () => {
          isValidCollectionFlag = false;
        },
      });
    });

    if (isValidCollectionFlag) {
      callback?.onSuccess?.();
      return;
    }

    callback?.onError?.();
  };

  private _useFieldValidator = (field: Field, callback?: { onSuccess?: () => void, onError: () => void}) => {
    const input = field.getFieldValue() as Input;
    const validator = field.getValidator();
    let isValidInput = true;

    if (validator instanceof Function) {
      isValidInput = validator(input.getValue() ?? '');
    }

    if (isValidInput) {
      // Костыль, Object.assign
      // @ts-ignore
      field.setProps({ errors: [] });
      callback?.onSuccess?.();
    } else {
      // Костыль, Object.assign
      field.setProps({ ...field.getProps(), errors: ['Проверьте поле'] });
      callback?.onError?.();
    }
  };

  public dispatchFormDidSubmit() {
    this.eventBus().emit(Form.EVENTS.VALIDATE);
  }

  private _validate = () => {
    this._useCollectionValidator(this.childrenCollection.fieldsCollection as Field[]);
  };

  private _clearForm = () => {
    (this.childrenCollection.fieldsCollection as Field[]).forEach((field) => {
      const input = field.getFieldValue() as Input;
      input.setValue('');
    });
  };

  private _submit = () => {
    this._useCollectionValidator(this.childrenCollection.fieldsCollection as Field[], {
      onSuccess: () => {
        this.submit();
      },
      onError: () => {
        console.error('Валидация была завершена с ошибками.', this.form);
      },
    });
  };

  protected validate = () => {

  };

  protected submit = () => {
    this.props.onSubmit(this.form);
    this._clearForm();
  };

  init() {
    this.props.attrs.name = this.id;
    this.childrenCollection.fieldsCollection = this.props.fields.map((field: FieldProps, index: number) => new Field(
      {
        ...field,
        isFormField: true,
        inputEvents: {
          ...field.events,
          input: (event: InputEvent & {target: HTMLInputElement}) => {
            this.form[field.name] = event.target?.value;
          },
          focus: () => {
            this._useFieldValidator(this.childrenCollection.fieldsCollection[index] as Field);
            // this.eventBus().emit(Form.EVENTS.VALIDATE);
          },
          blur: () => {
            this._useFieldValidator(this.childrenCollection.fieldsCollection[index] as Field);
            // this.eventBus().emit(Form.EVENTS.VALIDATE);
          },
        },
      },
    )) as Field[];
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
