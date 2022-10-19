import { expect } from 'chai';
import sinon from 'sinon';
import Button from './index';

describe('Button', () => {
  const defaultLabel = '';
  it('should render', () => {
    // eslint-disable-next-line no-new
    new Button({ label: defaultLabel });
  });

  it('element should return button', () => {
    const button = new Button({ label: defaultLabel });
    const { element } = button;
    expect(element).to.be.instanceof(window.HTMLButtonElement);
  });

  it('should call function on click', () => {
    const clickCallback = sinon.fake();
    const button = new Button({ label: defaultLabel, events: { click: clickCallback } });

    const { element } = button;
    element?.click();
    expect(clickCallback.callCount).to.eq(1);
  });
});
