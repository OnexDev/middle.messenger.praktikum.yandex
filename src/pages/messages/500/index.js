import htmlPage500 from './500.hbs'
import * as styles from '../messages.scss'

export default (props) => {
  return htmlPage500({ styles, ...props })
}
