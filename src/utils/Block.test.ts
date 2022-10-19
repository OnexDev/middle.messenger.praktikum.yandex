// eslint-disable-next-line max-classes-per-file
import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './Block';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    },
  },
}) as { default: typeof BlockType };

describe('Block', () => {
  class ComponentMock extends Block {

  }

  it('should fire init event on initialization', () => {
    // eslint-disable-next-line no-new
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('should fire CDU event on setting props', () => {
    const component = new ComponentMock({});
    component.setProps({ prop: 'newProp' });
    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
  });
});
