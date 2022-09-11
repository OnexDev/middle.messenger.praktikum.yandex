import Block from '../../utils/Block';
import template from './lobby.hbs';
import * as styles from './lobby.scss';

import Form from '../../components/form';

interface HomePageProps {

}

export default class HomePage extends Block {
  constructor(props: HomePageProps) {
    super('div', { props, styles });
  }

  init() {
    this.children.form = new Form(
      {
        fields: [
          {
            name: 'login',
            required: false,
            label: 'а',
            isFormField: true,
            validator: () => false,
          },
        ],
        submitButton: {
          label: 'Click here',
          isPrimary: true,
        },
        onSubmit: (form) => {
          console.log(form);
        },
      },

    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
