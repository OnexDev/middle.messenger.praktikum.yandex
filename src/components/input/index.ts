import Block, { BlockProps } from '../../utils/Block';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';

export interface InputProps extends BlockProps{
    attrs:{
        class?: string,
        placeholder?: string,
        name?: string,
        required?: boolean,
        value?: string,
        type?: string,
    }
    events?: Record<string, (event: Event) => void>
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(getPropsWithAugmentedClasses<InputProps>(
      {
        ...props,
      },
      [],
      [],
    ), 'input');
  }

  setValue(value: string) {
    (this.element as HTMLInputElement).value = value;
  }

  public getValue = () => {
    const content = this.getContent();
    if (content instanceof HTMLInputElement) {
      return content.value;
    }
    return undefined;
  };
}
