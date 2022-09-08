import { BlockProps } from '../models/BlockProps';

const getComputedBlockClass = (props: BlockProps, defaultInstance: string[], computedInstance: string[]): string => {
  const baseInstance = props.attrs?.class;
  return [...defaultInstance, ...computedInstance, baseInstance].join(' ');
};

const getPropsWithAugmentedClasses = <T extends BlockProps>(props: T,
  defaultClassInstance: string[], computedClassInstance: string[]) => ({
    ...props,
    attrs: {
      ...props.attrs,
      class: getComputedBlockClass(props, defaultClassInstance, computedClassInstance),
    },
  });

export default getPropsWithAugmentedClasses;
