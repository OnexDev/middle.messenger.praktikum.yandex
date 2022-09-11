import Block from '../../utils/Block';
import { BlockProps } from '../../utils/models/BlockProps';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';

export interface InputProps extends BlockProps{
    attrs:{
        class?: string,
        placeholder?: string,
        name: string,
        required: boolean,
        value: string,
        type?: string,
    }
    events?: Record<string, ()=> void>
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super('input', getPropsWithAugmentedClasses<InputProps>(
      {
        ...props,
      },
      [],
      [],
    ));
  }

  public getValue = () => {
    const content = this.getContent();
    if (content instanceof HTMLInputElement) {
      return content.value;
    }
    return undefined;
  };
}
