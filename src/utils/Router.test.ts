import { expect } from 'chai';
import Router from './Router';

describe.only('Router', () => {
  it('test', () => {
    Router.start();
    expect(1).to.eq(1);
  });
});
