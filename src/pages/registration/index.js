import auth from './registation.hbs'
import * as styles from '../authentiaction/authentiaction.scss'

export default (props) => {
  return auth({ styles, ...props })
}
