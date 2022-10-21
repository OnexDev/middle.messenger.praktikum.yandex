import { expect } from 'chai';
import sinon from 'sinon';
import { ComponentConstructable } from './Route';
import Router from './Router';

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window?.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window?.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;

    dispatchComponentDidMount = sinon.fake();
  } as unknown as ComponentConstructable;

  describe('.use()', () => {
    it('should return Router instance', () => {
      const result = Router.use('/', BlockMock);
      expect(result).to.eq(Router);
    });
  });

  describe('.back()', () => {
    it('should render a page on history back action', () => {
      Router
        .use('/', BlockMock)
        .start();

      Router.back();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  it('should render a page on start', () => {
    Router
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });
});
