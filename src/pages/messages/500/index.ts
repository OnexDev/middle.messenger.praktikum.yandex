import htmlPage500 from './500.hbs';
import * as styles from '../messages.scss';
import { BlockProps } from '../../../utils/models/BlockProps';

export default (props: BlockProps) => htmlPage500({ styles, ...props });
