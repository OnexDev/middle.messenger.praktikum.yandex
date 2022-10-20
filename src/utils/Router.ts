import Route, { ComponentConstructable } from './Route';
import { Routes } from '../index';

class Router {
  private static __instance: Router;

  private readonly _rootQuery: string;

  private _currentRoute: Route | null = null;

  private history: History;

  private _routes: Route[] = [];

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: ComponentConstructable<any>, isAvailablePath?: () => boolean) {
    try {
      const route = new Route(pathname, block, { rootQuery: this._rootQuery }, isAvailablePath);
      this._routes.push(route);
    } catch (e) {
      throw Error(e);
    }
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
    console.log(route, route?.isAvailableRoute)
    if (!route) {
      this.go(Routes.error404);
      return;
    }
    if(route.isAvailableRoute && !route.isAvailableRoute?.()){
        this.go(Routes.error404);
        return;;
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
    return this._routes.find((route) => route.match(pathname));
  }
}

export default new Router('#app');
