import { set } from './helpers';
import { EventBus } from './EventBus';
import Block, { BlockProps } from './Block';
import { User } from '../api/AuthAPI';
import { Chat } from '../api/ChatsAPI';
import { Message } from '../controllers/MessagesController';

export enum StoreEvents {
    UPDATED = 'updated'
}
interface State {
    user?: User,
    chats?: {
        data: Chat[],
        userLists?: Record<number, User[]>,
        isLoaded: boolean,
        selectedChat: number,
        error: string,
    },
    messages?: Record<number, Message[]>,
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
export function withStore<StoreGeneric extends Record<string, any>>(mapStateToProps: (state: State) => StoreGeneric) {
  return function wrap<PropsGeneric extends BlockProps = any>(Component: typeof Block<PropsGeneric>) {
    return class WithStore extends Component {
      constructor(props: Omit<PropsGeneric, keyof StoreGeneric>) {
        let previousState = mapStateToProps(store.getState());
        super({ ...props as PropsGeneric, ...previousState });

        store.on(StoreEvents.UPDATED, () => {
          const stateProps = mapStateToProps(store.getState());
          previousState = stateProps;
          // @ts-ignore // Не разобрался пока
          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
