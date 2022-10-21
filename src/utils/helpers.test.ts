import { expect } from 'chai';
import { set } from './helpers';

describe('Set helper function', () => {
  // arrange
  let obj: Record<string, unknown>;
  const keypath = 'test';
  const value = 'John Does';

  beforeEach(() => {
    obj = {};
  });

  it('should set a value by keypath to the object', () => {
    // act
    set(obj, keypath, value);
    // assert
    expect(obj).to.haveOwnProperty(keypath, value);
  });

  it('should return original object', () => {
    obj.test = 'another value';
    const result = set(obj, keypath, value);
    expect(result).to.equal(obj);
  });

  it('should return original object if it\'s not an object', () => {
    const notAnObject = '';

    const result = set(notAnObject, keypath, value);
    expect(result).to.eq(notAnObject);
  });

  it('should throw an error if keypath is not string', () => {
    const notAnString = 10;

    const f = () => set(obj, notAnString, value);
    expect(f).to.throw(Error, 'path must be string');
  });
});
