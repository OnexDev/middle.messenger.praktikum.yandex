import Route, { ComponentConstructable } from './Route';

class Router {
  private static __instance: Router;

  private readonly _rootQuery: string;

  private _currentRoute: Route | null = null;

  private history: History;

  private routes: Route[] = [];

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: ComponentConstructable<any>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent & { currentTarget: Window }) => {
      this._onRoute(event.currentTarget?.location?.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this._getRoute(pathname);
    if (!route) {
      this.go('/404');
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private _getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#app');
