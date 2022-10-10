import Block, { BlockProps } from '../../utils/Block';
import getPropsWithAugmentedClasses from '../../utils/atomic/getPropsWithAugmentedClasses';
import * as styles from './image.scss';

export interface ImageProps extends BlockProps{
    attrs: Partial<{
        class: string,
        alt: string,
        src: string,
        width: string,
        height: string,
    }>
}

export default class LoadingImage extends Block<ImageProps> {
  constructor(props: ImageProps) {
    super(getPropsWithAugmentedClasses<ImageProps>(
      {
        ...props,
        events: {
          error: () => this.setProps({
            attrs: { ...props.attrs, src: '/defaultAvatar.png' },
            events: {},
          }),
          load: () => this.setProps({
            attrs: {
              class: props.attrs.class,
            },
          }),
        },
      },
      [styles.isLoading],
      [],
    ), 'img');
  }
}
