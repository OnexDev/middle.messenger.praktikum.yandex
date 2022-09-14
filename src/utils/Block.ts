import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

export default abstract class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);

  protected props: any;

  public children: Record<string, Block<P>>;

  public childrenCollection: Record<string, Block<P>[]>;

  public eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private _meta: { tagName: string; props: any; };

  /** JSDoc
   * @param {string} tagName
   * @param propsWithChildren
   *
   * @returns {void}
   */
  constructor(tagName = 'div', propsWithChildren: any = {}) {
    const eventBus = new EventBus();
    const { props, children, childrenCollection } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      props,
    };

    this.children = children;
    this.childrenCollection = childrenCollection;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block<P>> = {};
    const childrenCollection: Record<string, Block<P>[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((element) => element instanceof Block)) {
        childrenCollection[key] = value;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children, childrenCollection };
  }

  private _addAttrs() {
    const { attrs = {} } = this.props as { attrs?: Record<string, string>};
    Object.entries(attrs).forEach(([name, value]) => {
      this._element?.setAttribute(name, value);
    });
  }

  private _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

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

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    return JSON.stringify(oldProps) === JSON.stringify(newProps);
  }

  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
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

  private _makePropsProxy(props: any) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = { ...target };
        target[prop] = value;
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
