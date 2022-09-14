import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

export type BlockProps = {
    styles?: string[],
    attrs?: Record<string, any>
    events?: Record<string, (...args: any[]) => void>,
}

export default abstract class Block<P extends BlockProps = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);

  protected props: P;

  public children: Record<string, Block>;

  public childrenCollection: Record<string, Block[]>;

  public eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private _meta: { tagName: string; props: P; };

  /** JSDoc
   * @param {string} tagName
   * @param propsWithChildren
   *
   * @returns {void}
   */
  // TODO: Переделать на default param last
  // eslint-disable-next-line default-param-last
  protected constructor(tagName = 'div', propsWithChildren: P) {
    const eventBus = new EventBus();
    const { props, children, childrenCollection } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      props: props as P,
    };

    this.children = children;
    this.childrenCollection = childrenCollection;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: P): {
      props: P,
      children: Record<string, Block>,
      childrenCollection: Record<string, Block[]>
  } {
    const props: Record<string, any> = {};
    const children: Record<string, Block> = {};
    const childrenCollection: Record<string, Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((element: unknown) => element instanceof Block)) {
        childrenCollection[key] = value as Block[];
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children, childrenCollection };
  }

  private _addAttrs() {
    const { attrs = {} } = this.props as P & { attrs?: Record<string, string>};
    Object.entries(attrs).forEach(([name, value]) => {
      this._element?.setAttribute(name, value);
    });
  }

  private _addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = Block._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    return JSON.stringify(oldProps) === JSON.stringify(newProps);
  }

  public setProps = (propsPart: P) => {
    if (!propsPart) {
      return;
    }

    Object.assign(this.props, propsPart);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    this._element!.innerHTML = '';

    this._element!.append(fragment);

    this._addAttrs();
    this._addEvents();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };
    Object.entries(this.childrenCollection).forEach(([collectionName, collection]) => {
      Object.entries(collection).forEach(([, component]) => {
        if (Array.isArray(contextAndStubs[collectionName])) {
          contextAndStubs[collectionName].push(`<div data-id="${component.id}"></div>`);
        } else {
          contextAndStubs[collectionName] = [`<div data-id="${component.id}"></div>`];
        }
      });
    });

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(contextAndStubs);
    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replacer = (component: Block<P>) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent()!);
    };

    Object.entries(this.childrenCollection).forEach(([, collection]) => {
      Object.entries(collection).forEach(([, component]) => {
        replacer(component);
      });
    });

    Object.entries(this.children).forEach(([, component]) => {
      replacer(component);
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: P) {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop as keyof P];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
        const oldTarget = { ...target };
        target[prop as keyof P] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private static _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  public show() {
    this.getContent()!.style.display = 'block';
  }

  public hide() {
    this.getContent()!.style.display = 'none';
  }
}
