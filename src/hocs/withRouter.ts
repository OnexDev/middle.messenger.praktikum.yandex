import Block from '../utils/Block';
import Router from '../utils/Router';

export function withRouter(Component: typeof Block<any>) {
    // @ts-ignore
    type Props = typeof Component extends typeof Block<infer P> ? P : any;

    return class WithRouter extends Component {
      constructor(props: Props & PropsWithRouter) {
        super('div', { ...props, router: Router });
      }
    };
}

export interface PropsWithRouter {
    router: typeof Router;
}