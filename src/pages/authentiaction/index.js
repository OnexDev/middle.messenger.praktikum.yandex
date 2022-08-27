import auth from './authentiaction.hbs'
import * as styles from './authentiaction.scss'

export default (props) => {
    return auth({styles, ...props})
}