import Block, { BlockProps } from './Block';

export function isEqualStrings(lhs: string, rhs: string): Boolean {
  return lhs === rhs;
}

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';
  root.append(block.getContent()!);
  block.dispatchComponentDidMount();

  return root;
}

export interface ComponentConstructable<P extends BlockProps> {
    new(props: P): Block<P>
}

export default class Route {
  private _pathname: string;

  private _block: Block | null = null;

  private _props: {rootQuery: string};

  private readonly _blockClass: ComponentConstructable<any>;

  constructor(pathname: string, view: ComponentConstructable<any>, props: {rootQuery: string}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  public match(pathname: string) {
    return isEqualStrings(pathname, this._pathname);
  }

  public render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      render(this._props.rootQuery, this._block!);
      return;
    }

    this._block.show();
  }
}
