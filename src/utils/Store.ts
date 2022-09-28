import { set } from './helpers';
import { EventBus } from './EventBus';
import Block, { BlockProps } from './Block';
import { User } from '../api/AuthAPI';

export enum StoreEvents {
    UPDATED = 'updated'
}
interface State {
    user?: User,
    chatsTokens?: Record<number, string>
}

export class Store extends EventBus {
  private _state: State = {};

  public set(keypath: string, data: unknown) {
    set(this._state, keypath, data);
    this.emit(StoreEvents.UPDATED, this.getState());
  }

  public getState(): State {
    return this._state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {
  return function wrap(Component: typeof Block) {
    let previousState: any;

    return class WithStore<P extends BlockProps = any> extends Component {
      constructor(props: P) {
        previousState = mapStateToProps(store.getState());
        super('div', { ...props, ...previousState });

        store.on(StoreEvents.UPDATED, () => {
          const stateProps = mapStateToProps(store.getState());
          // if (isEqual(previousState, stateProps)) {
          //     return;
          // }
          previousState = stateProps;
          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
