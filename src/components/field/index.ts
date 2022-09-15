import template from './field.hbs';
import * as styles from './field.scss';
import Block, { BlockProps } from '../../utils/Block';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import Input from '../input';
import FieldErrors from '../error';

export interface FieldProps extends BlockProps{
    label?: string,
    placeholder?: string,
    name: string,
    required?: boolean,
    isFormField?: boolean,
    type?: string,
    value?: string,
    // TODO: make validator return Error Object
    validator?: (value: string) => boolean,
    errors?: string[],
    inputEvents?: Record<string, (e:Event)=> void>
}

export default class Field extends Block<FieldProps> {
  constructor(props: FieldProps) {
    super('label', getPropsWithAugmentedClasses<FieldProps>(
      {
        ...props,
      },
      [styles.field],
      [
        props.isFormField ? styles.formField : '',
        props.errors && props.errors.length > 0 ? styles.hasError : '',
      ],
    ));
  }

  protected componentDidUpdate(oldProps: FieldProps, newProps: FieldProps) {
    if (newProps.errors || newProps.errors !== oldProps.errors) {
      this.children.fieldErrors.setProps({ errors: this.props.errors }); // ререндерим ошибку
      return false; // сам компонент не ререндерим
    }
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  public getFieldValue() {
    return this.children?.input;
  }

  public getValidator(): ((value: string) => boolean) | undefined {
    return this.props.validator;
  }

  init() {
    this.children.fieldErrors = new FieldErrors({
      errors: this.props.errors,
    });
    this.children.input = new Input({
      attrs: {
        class: styles.input,
        placeholder: this.props.placeholder ?? '',
        name: this.props.name,
        required: this.props.required,
        value: this.props.value ?? '',
        type: this.props.type ?? 'text',
      },
      events: this.props.inputEvents,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
